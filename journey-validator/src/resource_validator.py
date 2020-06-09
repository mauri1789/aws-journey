import os
import boto3
import json
import importlib
from journey_requests import web_response
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')

table = os.getenv('TABLE_NAME')
journey_table = dynamodb.Table(table)

def handler(event, context):
    
    records = event["Records"]
    for record in records:
        body = json.loads(record["body"])

        user = body["user"]
        step = body["step"]
        lab = body["lab"]
        user_input = body["user_input"]
        execution_id = body["execution_id"]
        execution = {
            "pk": f"execution-{user}-{lab}",
            "sk": step,
            "user_input": user_input,
            "execution_id": execution_id
        }
        tests = []
        try:
            user_session = get_user_session(user)
            
            tests, step_record = get_tests(step)
            execution["description"] = step_record.get("description")
            
            tests, response = process_tests(tests, user_session, user_input)
            
            execution["tests"] = tests
            execution["success"] = response["success"]
            print({"execution": execution})
            
            db_response = journey_table.put_item(Item=execution)
            print({"db_response": db_response})
            
        except Exception as error:
            execution["error"] = str(error)
            execution["success"] = False
            execution["tests"] = tests
            if not execution.get("description"):
                execution["description"] = "Tests failed"
            print({"execution": execution})
            
            db_response = journey_table.put_item(Item=execution)
            print({"db_response": db_response})
            raise error
    return web_response(200, response)

def get_user_session(user):
    credentials = journey_table.get_item(
        Key={
            'pk': user,
            'sk': 'credentials'
        }
    )["Item"]
    user_session = boto3.session.Session(
        aws_access_key_id=credentials["access_key"],
        aws_secret_access_key=credentials["secret_access_key"],
        region_name=credentials["region"]
    )
    return user_session

def get_tests(step):
    step_data = journey_table.query(
        KeyConditionExpression=Key('pk').eq(step)
    )["Items"]
    tests = [{
        "test": item["sk"],
        "method": item["method"],
        "mappings": item.get("mappings"),
        "description": item["description"]
        }
        for item in step_data if item["sk"].startswith('test')]
    step_record = [item for item in step_data if item["sk"] == step].pop()
    return tests, step_record

def process_tests(tests, user_session, user_input):
    response = {"success": True}
    for test in tests:
        method_exec = run_str_method(test["method"], user_session, user_input)
        test["success"] = method_exec["success"]
        if not method_exec["success"]:
            response = method_exec
            break
    for test in tests:
        del test["method"]
        del test["mappings"]
    return tests, response

def run_str_method(path, user_session, data):
    mod_name, func_name = path.rsplit('.',1)
    mod = importlib.import_module(mod_name)
    func = getattr(mod, func_name)
    return func(user_session, data)

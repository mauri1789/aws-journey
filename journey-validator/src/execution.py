import os
import json
import boto3
from journey_requests import web_response
from journey_utils import get_random_num
from boto3.dynamodb.conditions import Key, Attr

table = os.getenv('TABLE_NAME')

dynamodb = boto3.resource('dynamodb')
journey_table = dynamodb.Table(table)

def get(event, context):
    queryParams = event["queryStringParameters"]
    user = queryParams["user"]
    lab = queryParams["lab"]
    execution_id = event["pathParameters"]["execution_id"]
    execution = f"execution-{user}-{lab}"
    
    execution_data = get_execution(execution)
    
    execution_summary = [item for item in execution_data if item["sk"]=="summary"]
    execution_steps = [{
        "step": item["sk"],
        "tests": item["tests"],
        "success": set_success_by_execution_id (item, execution_id),
        "execution_id": item["execution_id"],
        "description": item["description"],
        "error": item.get("error")
    }
    for item in execution_data
        if item["sk"].startswith("step")
    ]
    
    response = {}
    status = "NOT TESTED"
    if execution_summary:
        execution_summary = execution_summary.pop()
        step_number = execution_summary["steps"]
        user_input = execution_summary.get("user_input")
        response["user_input"] = [{"key": key, "value": value} for key, value in user_input.items()]
        response["steps"] = execution_steps
        success = all([step["success"] for step in execution_steps])
        untested_steps = any_untested_steps(execution_steps)
        all_tests = len(execution_steps) == execution_summary["steps"]
        if success and not untested_steps and all_tests:
            status = "SUCCESS"
        if not success:
            status = "FAILED"
        if untested_steps or not all_tests:
            status = "IN PROGRESS"
    else:
        test_data = journey_table.get_item(
            Key={
                'pk': f"lab-{lab}",
                'sk': 'test_data'
            }
        )["Item"]
        response["user_input"] = [{"key": key, "value":""} for key in test_data["user_input"]]
        response["steps"] = []
        
    response["status"]=status
    return web_response(200, response)

def set_success_by_execution_id (item, execution_id):
    if execution_id == "any" or item["execution_id"]==execution_id:
        return item["success"]
    else:
        return None

def get_execution(execution):
    execution_data = journey_table.query(
        KeyConditionExpression=Key('pk').eq(execution)
    )["Items"]
    return execution_data

def any_untested_steps(steps):
    if steps:
        return any([step["success"]==None for step in steps])
    else:
        return False

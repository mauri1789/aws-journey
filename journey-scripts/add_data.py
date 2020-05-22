import json
import boto3
import uuid
import copy

dynamodb = boto3.resource('dynamodb')
journey_table = dynamodb.Table('journey-app-table')

def add_lab_to_dynamo(lab):
    with open("journey-scripts/labs.json") as labs:
        all_labs = json.load(labs)
    lab = all_labs[lab]
    lab_record = {
        "pk": lab["lab_id"],
        "sk": lab["lab_id"],
        "user_input": lab["user_input"],
        "resources": lab["resources"]
    }
    steps=[]
    tests=[]
    for step in lab["steps"]:
        step_id = f"step-{str(uuid.uuid4())[-17:]}"
        lab_step = {
            "pk": lab["lab_id"],
            "sk": step_id,
            "description": step.get("description")
        }
        step_data = {
            "pk": step_id,
            "sk": step_id,
            "input": step.get("input")
        }
        steps.append(lab_step)
        steps.append(step_data)
        step_tests = [
            {
                "pk": step_id,
                "sk":f"test-{str(uuid.uuid4())[-17:]}",
                "file": test["file"],
                "function": test["function"],
                "mappings": test.get("mappings")
            }
            for test in step["tests"]]
        tests.extend(step_tests)
    all_records = [lab_record]
    all_records.extend(steps)
    all_records.extend(tests)
    with journey_table.batch_writer() as batch:
        for record in all_records:
            batch.put_item(
                Item=record
            )
    print(all_records)
add_lab_to_dynamo("S3_static_website")
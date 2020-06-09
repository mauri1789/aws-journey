import json
import yaml
import boto3
import uuid
import copy

dynamodb = boto3.resource('dynamodb')
journey_table = dynamodb.Table('journey-app-table')

def get_random_num():
    return '.'.join(str(uuid.uuid4())[-17:].split('-'))

def add_lab_to_dynamo():
    with open("journey-content/dev_cert/s3/s3_website.yaml") as yaml_lab:
        try:
            lab = yaml.safe_load(yaml_lab)
        except yaml.YAMLError as exc:
            print(exc)
    lab_tests = lab["Tests"]
    lab_id = f"lab-{lab['Lab']}"
    lab_record = {
        "pk": lab_id,
        "sk":  "test_data",
        "user_input": lab_tests["UserInput"],
        "resources": lab_tests["Resources"]
    }
    steps=[]
    tests=[]
    for step in lab_tests["Steps"]:
        step_id = f"step-{step['Id']}"
        lab_step = {
            "pk": lab_id,
            "sk": step_id,
            "description": step.get("Description")
        }
        step_data = {
            "pk": step_id,
            "sk": step_id,
            "description": step.get("Description"),
            "input": step.get("Input")
        }
        steps.append(lab_step)
        steps.append(step_data)
        step_tests = [
            {
                "pk": step_id,
                "sk":f"test-{index+1}",
                "description": test["Description"],
                "method": test["Method"],
                "mappings": test.get("Mappings")
            }
            for index, test in enumerate(step["Tests"])]
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
    
add_lab_to_dynamo()
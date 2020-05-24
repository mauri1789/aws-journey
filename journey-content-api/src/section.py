import os
import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')

table = os.getenv('TABLE_NAME')
journey_table = dynamodb.Table(table)

def get(event, context):
    
    section = event["pathParameters"]["section"]
    
    steps = get_section(f"section-{section}")
    
    response = {
        "steps": steps,
        "section": section
    }
    
    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }

def get_section(section):
    section_data = journey_table.query(
        KeyConditionExpression=Key('pk').eq(section)
    )["Items"]
    steps = [{
        "step": step["sk"],
        "text": step["text"],
        "coments": step["comments"],
        "code": step["code"],
        "code_url": step["code_url"],
        "description": step.get("description")
    } for step in section_data if step["sk"].startswith('step')]
    
    steps = [{k: v for k, v in step.items() if v is not None} for step in steps]
    
    # section_record = [{
    #     "section": section["pk"]
    # } for section in section_data if section["sk"].startswith('section')][0]
    
    return steps

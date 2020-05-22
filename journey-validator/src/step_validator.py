import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')
journey_table = dynamodb.Table('journey-app-table')

def handler(event, context):
    body = json.loads(event["body"])
    user_id = body["user"]
    lab = body["lab"]
    user_input = body["user_input"]
    
    steps = get_lab_data(lab)
    
    for step in steps:
        print(step, user_input)
    
    return {
        "statusCode": 200,
        "body": json.dumps("Success")
    }

def get_lab_data(lab):
    lab_data = journey_table.query(
        KeyConditionExpression=Key('pk').eq(lab)
    )["Items"]
    steps = [item["sk"] for item in lab_data if item['sk'].startswith('step')]
    return steps

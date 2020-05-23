import os
import json
import uuid
import boto3
from boto3.dynamodb.conditions import Key, Attr

table = os.getenv('TABLE_NAME')
queue = os.getenv('QUEUE_NAME')

dynamodb = boto3.resource('dynamodb')
sqs = boto3.resource('sqs')
journey_queue = sqs.get_queue_by_name(QueueName=queue)
journey_table = dynamodb.Table(table)

def handler(event, context):
    body = json.loads(event["body"])
    user_id = body["user"]
    lab = body["lab"]
    user_input = body["user_input"]
    
    steps = get_lab_data(lab)

    queue_entries = [
        {
            "Id": str(uuid.uuid4()),
            "MessageBody": json.dumps({
                "user": user_id,
                "lab": lab,
                "step": step,
                "user_input": user_input
            })
        } for step in steps
    ]
    
    journey_queue.send_messages(Entries=queue_entries)
    
    return {
        "statusCode": 200,
        "body": json.dumps({"queue_entries": queue_entries})
    }

def get_lab_data(lab):
    lab_data = journey_table.query(
        KeyConditionExpression=Key('pk').eq(lab)
    )["Items"]
    steps = [item["sk"] for item in lab_data if item['sk'].startswith('step')]
    return steps

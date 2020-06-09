import os
import json
import uuid
import boto3
from journey_requests import web_response
from journey_utils import get_random_num
from boto3.dynamodb.conditions import Key, Attr

table = os.getenv('TABLE_NAME')
queue = os.getenv('QUEUE_NAME')

dynamodb = boto3.resource('dynamodb')
sqs = boto3.resource('sqs')
journey_queue = sqs.get_queue_by_name(QueueName=queue)
journey_table = dynamodb.Table(table)

def handler(event, context):
    body = json.loads(event["body"])
    user = body["user"]
    lab = body["lab"]
    user_input = body["user_input"]
    execution_id = get_random_num()
    
    step_list, steps = get_lab_data(f"lab-{lab}")
    
    queue_entries = [
        {
            "Id": str(uuid.uuid4()),
            "MessageBody": json.dumps({
                "user": user,
                "lab": lab,
                "step": step,
                "user_input": user_input,
                "execution_id": execution_id
            })
        } for step in step_list
    ]
    
    api_response = [
        {
            "description": step["description"],
            "step": step["sk"],
            "execution_id": execution_id,
            "success": None,
            "tests": []
        } for step in steps
    ]

    journey_table.put_item(
        Item = {
            "pk": f"execution-{user}-{lab}",
            "sk": "summary",
            "user_input": user_input,
            "steps": len(steps)
        }
    )
    
    
    journey_queue.send_messages(Entries=queue_entries)
    print(api_response)
    
    return web_response(200, api_response)

def get_lab_data(lab):
    lab_data = journey_table.query(
        KeyConditionExpression=Key('pk').eq(lab)
    )["Items"]
    step_list = [item["sk"] for item in lab_data if item['sk'].startswith('step')]
    steps = [item for item in lab_data if item['sk'].startswith('step')]
    return step_list, steps

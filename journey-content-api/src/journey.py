import os
import json
import boto3
from journey_requests import web_response
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')

table = os.getenv('TABLE_NAME')
journey_table = dynamodb.Table(table)

def get(event, context):
    
    journey = event["pathParameters"]["journey"]
    
    topics, journey_record = get_journey(f"journey-{journey}")
    
    response = {
        "topics": topics,
        "journey": journey_record
    }
    
    return web_response(200, response)

def get_journey(journey):
    journey_data = journey_table.query(
        KeyConditionExpression=Key('pk').eq(journey)
    )["Items"]
    topics = [{
        "topic_id": topic["sk"].split('-')[1],
        "type": topic["type"],
        "description": topic.get("description")
    } for topic in journey_data if topic["sk"].startswith('topic')]

    journey_record = [{
        "journey": journey["name"]
    } for journey in journey_data if journey["sk"] == 'info'][0]
    
    return topics, journey_record

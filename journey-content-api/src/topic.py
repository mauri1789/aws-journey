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
    
    topic = event["pathParameters"]["topic"]
    journey = event["pathParameters"]["journey"]
    
    sessions, topic_record = get_topic(f"topic-{journey}-{topic}")
    
    response = {
        "sessions": sessions,
        "topic": topic_record
    }
    
    return web_response(200, response)

def get_topic(topic):
    topic_data = journey_table.query(
        KeyConditionExpression=Key('pk').eq(topic)
    )["Items"]
    sessions = [{
        "session_id": topic["sk"],
        "type": topic["sk"].split('-')[0],
        "description": topic.get("description")
    } for topic in topic_data if topic["sk"].startswith('session')]


    topic_record = [{
        "description": topic["description"],
        "type": topic["type"]
    } for topic in topic_data if topic["sk"] == 'info'][0]
    
    return sessions, topic_record

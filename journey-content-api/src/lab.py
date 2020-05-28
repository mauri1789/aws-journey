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
    
    lab = event["pathParameters"]["lab"]
    
    sections, lab_record = get_lab(f"lab-{lab}")
    
    response = {
        "sections": sections,
        "lab": lab_record
    }
    
    return web_response(200, response)

def get_lab(lab):
    lab_data = journey_table.query(
        KeyConditionExpression=Key('pk').eq(lab)
    )["Items"]
    sections = [{
        "section": section["sk"],
        "title": section["title"],
        "description": section.get("description")
    } for section in lab_data if section["sk"].startswith('section')]
    
    sections = [{k: v for k, v in section.items() if v is not None} for section in sections]
    
    lab_record = [{
        "lab": lab["pk"]
    } for lab in lab_data if lab["sk"].startswith('lab')][0]
    
    return sections, lab_record

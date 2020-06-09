import os
import json
import boto3
from journey_requests import web_response
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

table = os.getenv('TABLE_NAME')
files_bucket = os.getenv('FILES_BUCKET')
journey_table = dynamodb.Table(table)

def get(event, context):
    
    section = event["pathParameters"]["section"]
    
    steps = get_section(f"section-{section}")
    
    response = {
        "steps": steps,
        "section": section
    }
    
    return web_response(200, response)

def get_section(section):
    section_data = journey_table.query(
        KeyConditionExpression=Key('pk').eq(section)
    )["Items"]
    steps = [{
        "step": step["sk"],
        "text": step["text"],
        "coments": step["comments"],
        "code": step["code"],
        "code_extension": step["code_extension"],
        "code_file_name": get_code_file_name(step["code_file_key"]),
        "list": step["list"],
        "code_url": generateSignedUrl(step["code_file_key"]),
        "images": convert_images(step["images"]),
        "description": step.get("description")
    } for step in section_data if step["sk"].startswith('step')]
    
    steps = [{k: v for k, v in step.items() if v is not None} for step in steps]
    
    # section_record = [{
    #     "section": section["pk"]
    # } for section in section_data if section["sk"].startswith('section')][0]
    
    return steps

def get_code_file_name(path):
    if path is not None:
        return path.split('/')[-1]
    return None

def generateSignedUrl(key):
    if key is not None:
        try:
            response = s3.generate_presigned_url(
                'get_object',
                Params={
                    'Bucket': files_bucket,
                    'Key': key
                },
                ExpiresIn=36000
            )
        except ClientError as e:
            print(e)
            return None
        return response
    return None

def convert_images(images):
    if images is not None:
        return [generateSignedUrl(image) for image in images]
    return None

import boto3
import json
from journey_requests import web_response

def handler(event, context):
    return web_response(200, {"hi": "world"})

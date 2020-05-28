import json
from journey_requests import web_response

def handler(event, context):
    records = event["Records"]
    print(event)
    for record in records:
        response = json.loads(record["body"])
    
    return web_response(200, response)

import json

def handler(event, context):
    records = event["Records"]
    print(event)
    for record in records:
        response = json.loads(record["body"])
    
    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }

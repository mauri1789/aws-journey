import json

def handler(event, context):
    records = event["Records"]
    for record in records:
        print(record)
        response = json.loads(record["body"])
    
    return {
        "statusCode": 200,
        "body": json.dumps(response)
    }

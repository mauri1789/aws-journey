import boto3
import json

def handler(event, context):
    print("-========-")
    print(event)
    return {
        "statusCode": 200,
        "body": json.dumps("lambda :)")
    }

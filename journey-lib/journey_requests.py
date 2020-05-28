import json
def web_response(status, data):
   return {
      "statusCode": status,
      "body": json.dumps(data),
      "headers": {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*'
      }
   }
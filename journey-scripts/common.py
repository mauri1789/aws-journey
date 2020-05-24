import uuid
import boto3

dynamodb = boto3.resource('dynamodb')
journey_table = dynamodb.Table('journey-app-table')

def get_random_num():
    return '.'.join(str(uuid.uuid4())[-17:].split('-'))

def add_to_db(records):
    with journey_table.batch_writer() as batch:
        for record in records:
            batch.put_item(
                Item=record
            )
    print(records)

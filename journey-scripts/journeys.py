import yaml
import uuid
import boto3

dynamodb = boto3.resource('dynamodb')
journey_table = dynamodb.Table('journey-app-table')

def add_to_db(records):
    with journey_table.batch_writer() as batch:
        for record in records:
            batch.put_item(
                Item=record
            )
    print(records)

def add_journey():
    topic_to_change = "fundamentals"
    with open("journey-content/dev_cert/developer_certification.yaml") as yaml_journey:
        try:
            journey = yaml.safe_load(yaml_journey)
        except yaml.YAMLError as exc:
            print(exc)
    journey_id = journey["Id"]
    journey_record = {
        "pk": f"journey-{journey_id}",
        "sk": "info",
        "name": journey["Name"]
    }
    all_records = []
    all_records.append(journey_record)
    
    for topic in journey["Topics"]:
        # if topic["Id"] != topic_to_change:
        #     continue
        topic_id = topic["Id"]
        journey_topic_record = {
            "pk": f"journey-{journey_id}",
            "sk": f"topic-{topic_id}",
            "description": topic["Name"],
            "type": topic["Type"]
        }
        topic_info_record = {
            "pk": f"topic-{journey_id}-{topic_id}",
            "sk": "info",
            "description": topic["Description"],
            "type": topic["Type"]
        }
        topic_records = [{
            "pk": f"topic-{journey_id}-{topic_id}",
            "sk": f"session-{session['Id']}",
            "description": session.get("Description")
        } for session in (topic.get("Sessions") or [])]
        topic_records.append(journey_topic_record)
        topic_records.append(topic_info_record)
        all_records.extend(topic_records)
    add_to_db(all_records)

add_journey()

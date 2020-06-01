import yaml
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

def add_sections():
    with open("journey-content/dev_cert/s3/s3_website.yaml") as yaml_lab:
        try:
            lab = yaml.safe_load(yaml_lab)
        except yaml.YAMLError as exc:
            print(exc)
    sections = lab['Sections']
    lab_id = f"lab-{lab['Lab']}"
    lab_record = {
        "pk": lab_id,
        "sk": lab_id,
        "description": lab["Description"]
    }
    all_records = []
    all_records.append(lab_record)
    section_records = []
    for section in sections:
        section_id = f"section-{section['Id']}"
        section_record = {
            "pk": lab_id,
            "sk": section_id,
            "title": section["Title"],
            "description": section.get("Description")
        }
        section_records.append(section_record)
        
        steps = [{
          "pk": section_id,
          "sk": f"step-{index+1}",
          "text": step["Text"],
          "comments": step.get("Comments"),
          "list": step.get("List"),
          "code": convertFile(step.get("Code")),
          "code_extension": get_file_extension(step.get("Code")),
          "code_url": step.get("CodeUrl")
        } for index, step in enumerate(section["Steps"])]
        
        section_records.extend(steps)
        
    all_records.extend(section_records)
    
    add_to_db(all_records)

def get_file_extension(location):
    if (location is not None):
        return location.split('.')[-1]
    return None

def convertFile(location):
    text = None
    if location is not None:
        with open(location) as file:
            text = file.read()
    return text

add_sections()



import uuid

def get_random_num():
    return '.'.join(str(uuid.uuid4())[-17:].split('-'))

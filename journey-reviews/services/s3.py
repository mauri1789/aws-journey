from services.common import check_status
from botocore.exceptions import ClientError
class GeneralException(Exception):
    pass


s3_bucket = "S3_bucket"

def public_access_block_config(user_session, data):
    bucket = data[s3_bucket]
    s3 = user_session.client('s3')
    try:
        access = s3.get_public_access_block(Bucket=bucket)
    except ClientError as error:
        if (error.response['Error']['Code'] == "NoSuchPublicAccessBlockConfiguration"):
            return check_status(True, "")
        else:
            print({"error": error.response})
            raise GeneralException(error.response['Error'])
    access = access["PublicAccessBlockConfiguration"]
    message = ""
    all_public = all(not access_conf for access_conf in access.values())
    if not all_public:
        message= "some access configurations are blocking public access"
    return check_status(all_public, message)

def public_bucket_policy(user_session, data):
    bucket = data[s3_bucket]
    s3 = user_session.client('s3')
    try:
        status = s3.get_bucket_policy_status(Bucket=bucket)
    except ClientError as error:
        if (error.response['Error']['Code'] == "NoSuchBucketPolicy"):
            return check_status(False, "No bucket Policy")
        else:
            print({"error": error.response})
            raise GeneralException(error.response['Error'])
    
    message = ""
    public_policy = status["PolicyStatus"]["IsPublic"]
    if not public_policy:
        message = "Bucket policy does not allow public access"
    
    return check_status(public_policy, message)

def website_config(user_session, data):
    bucket = data[s3_bucket]
    s3 = user_session.client('s3')
    try:
        s3.get_bucket_website(Bucket=bucket)
    except ClientError as error:
        if (error.response['Error']['Code'] == "NoSuchWebsiteConfiguration"):
            return check_status(False, "No S3 static website Configuration")
        else:
            print({"error": error.response})
            raise GeneralException(error.response['Error'])

    return check_status(True, "")

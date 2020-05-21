import boto3
from .common import check_status
from botocore.exceptions import ClientError

s3 = boto3.client('s3')

def public_access_block_config(bucket):
    try:
        access = s3.get_public_access_block(Bucket=bucket)
    except ClientError as error:
        if (error.response['Error']['Code'] == "NoSuchPublicAccessBlockConfiguration"):
            return check_status(True, "")
        else:
            print({"error": error.response})
            raise error
    message = ""
    all_public = all(not access_conf for access_conf in access.values())
    if not all_public:
        message= "some access configurations are blocking public access"
    return check_status(all_public, message)

def public_bucket_policy(bucket):
    try:
        status = s3.get_bucket_policy_status(Bucket=bucket)
    except ClientError as error:
        if (error.response['Error']['Code'] == "NoSuchBucketPolicy"):
            return check_status(False, "No bucket Policy")
        else:
            print({"error": error.response})
            raise error
    
    message = ""
    public_policy = status["PolicyStatus"]["IsPublic"]
    if not public_policy:
        message = "Bucket policy does not allow public access"
    
    return check_status(public_policy, message)

def website_config(bucket):
    try:
        s3.get_bucket_website(Bucket=bucket)
    except ClientError as error:
        if (error.response['Error']['Code'] == "NoSuchWebsiteConfiguration"):
            return check_status(False, "No S3 static website Configuration")
        else:
            print({"error": error.response})
            raise error

    return check_status(True, "")

import boto3
from botocore.exceptions import ClientError

s3 = boto3.client('s3')

def public_access_block_config(bucket):
    try:
        access = s3.get_public_access_block(Bucket=bucket)
    except ClientError as error:
        if (error.response['Error']['Code'] == "NoSuchPublicAccessBlockConfiguration"):
            return True
        else:
            print({"error": error.response})
            raise error

    return all(not access_conf for access_conf in access.values())

def public_bucket_policy(bucket):
    try:
        status = s3.get_bucket_policy_status(Bucket=bucket)
    except ClientError as error:
        if (error.response['Error']['Code'] == "NoSuchBucketPolicy"):
            return False
        else:
            print({"error": error.response})
            raise error
    
    return status["PolicyStatus"]["IsPublic"]

def website_config(bucket):
    try:
        s3.get_bucket_website(Bucket=bucket)
    except ClientError as error:
        if (error.response['Error']['Code'] == "NoSuchWebsiteConfiguration"):
            return False
        else:
            print({"error": error.response})
            raise error

    return True

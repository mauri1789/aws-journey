from services.s3 import public_access_block_config, public_bucket_policy, website_config

s3_bucket = "journey-bucket"
def validator():
    tests = [
        public_access_block_config(s3_bucket),
        public_bucket_policy(s3_bucket),
        website_config(s3_bucket)
    ]
    final_status = all(test["success"] for test in tests)
    errors = [test for test in tests if not test["success"]]
    
    return final_status, errors

print(validator())
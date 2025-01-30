import os

import botocore
from aws_secretsmanager_caching import (
    InjectKeywordedSecretString,
    SecretCache,
)

client = botocore.session.get_session().create_client(
    "secretsmanager", region_name=os.environ.get("AWS_REGION", "us-east-1")
)
cache = SecretCache(client=client)

DB_SECRET_NAME = os.environ.get("DB_SECRET_NAME", "")
database_secret = cache.get_secret_string(DB_SECRET_NAME)


# use this if the secret is JSON
# @InjectKeywordedSecretString(
#     secret_id=DB_SECRET_NAME, cache=cache, func_password="password"
# )
# def from_secret(func_password):
#     return func_password

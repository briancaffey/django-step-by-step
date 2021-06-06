import os

import botocore
from aws_secretsmanager_caching import InjectKeywordedSecretString, SecretCache

client = botocore.session.get_session().create_client('secretsmanager', region_name='us-east-1')
cache = SecretCache(client=client)

DB_SECRET_ID = os.environ.get("DB_SECRET_ID", "")

@InjectKeywordedSecretString(secret_id=DB_SECRET_ID, cache=cache, func_password='password')
def from_secret(func_password):
    return func_password

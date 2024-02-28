import os

import psycopg2

def create_database(database_name=None):
    """
    This function is only used with ad-hoc environments

    It creates a database for the ad-hoc environment in which it runs. This currently only supports postgres.
    """
    dbname = database_name or os.environ.get("APP_ENV_NAME")
    try:
        conn = psycopg2.connect(
            dbname=os.environ.get("BASE_ENV_NAME", "postgres"),
            user=os.environ.get("DB_USER", "postgres"),
            host=os.environ.get("POSTGRES_SERVICE_HOST", "localhost"),
            password=os.environ.get("POSTGRES_PASSWORD", "postgres")
        )

        # https://www.psycopg.org/docs/connection.html#connection.set_isolation_level
        conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)

        cur = conn.cursor()

        # Check if the database already exists
        cur.execute(f"SELECT  1 FROM pg_database WHERE datname = '{dbname}';")
        exists = cur.fetchone() is not None

        if not exists:
            # Execute the CREATE DATABASE command if the database does not exist
            cur.execute(f"CREATE DATABASE {dbname};")
            print(f"Database '{dbname}' created successfully.")
        else:
            print(f"Database '{dbname}' already exists.")

        # Commit the changes if any
        conn.commit()

        # Close the cursor and connection
        cur.close()
        conn.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error: {error}")

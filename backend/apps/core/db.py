import os

import psycopg2

from apps.core.utils import database_secret


def create_database(database_name):
    """
    This function creates a database for the given environment if it does not already exist.
    Currently only supports postgres.
    """

    try:
        conn = psycopg2.connect(
            dbname="postgres",
            user="postgres",
            host=os.environ.get("POSTGRES_SERVICE_HOST", "localhost"),
            password=database_secret,  # os.environ.get("POSTGRES_PASSWORD", "postgres")
        )

        # https://www.psycopg.org/docs/connection.html#connection.set_isolation_level
        conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)

        cur = conn.cursor()

        # Check if the database already exists
        cur.execute("SELECT 1 FROM pg_database WHERE datname = %s;", (database_name,))
        exists = cur.fetchone() is not None

        if not exists:
            # Execute the CREATE DATABASE command if the database does not exist
            cur.execute(f'CREATE DATABASE "{database_name}";')
            print(f"Database '{database_name}' created successfully.")
        else:
            print(f"Database '{database_name}' already exists.")

        # Commit the changes if any
        conn.commit()

        # Close the cursor and connection
        cur.close()
        conn.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error: {error}")

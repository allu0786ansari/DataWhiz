import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch DB credentials from .env
DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
}

def execute_query(sql_query):
    """Executes an SQL query and returns results in JSON format."""
    connection = None
    try:
        # Establish MySQL connection
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()

        # Execute the SQL query
        cursor.execute(sql_query)

        # Handle SELECT queries
        if sql_query.strip().lower().startswith("select"):
            columns = [desc[0] for desc in cursor.description]  # Column names
            results = cursor.fetchall()  # Fetch rows
            
            # Convert to list of dictionaries
            formatted_results = [dict(zip(columns, row)) for row in results]

        else:
            connection.commit()
            formatted_results = {"message": "Query executed successfully."}

        return formatted_results

    except Error as e:
        return {"error": str(e)}

    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

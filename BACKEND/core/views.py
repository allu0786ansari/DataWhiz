from rest_framework.response import Response, render
from rest_framework.decorators import api_view
import sqlite3
from .query_processor import convert_nl_to_sql

@api_view(['POST'])
def process_query(request):
    """
    API to process natural language queries and return SQL results.
    """
    try:
        user_query = request.data.get("query", "")
        sql_query = convert_nl_to_sql(user_query)

        # Connect to the database
        conn = sqlite3.connect("db.sqlite3")
        cursor = conn.cursor()
        cursor.execute(sql_query)
        result = cursor.fetchall()
        conn.close()

        return Response({"query": sql_query, "result": result})

    except Exception as e:
        return Response({"error": str(e)}, status=400)

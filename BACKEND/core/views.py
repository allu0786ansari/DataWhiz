from rest_framework.response import Response
from rest_framework.decorators import api_view
import pymysql
from .query_processor import convert_nl_to_sql

@api_view(['POST'])
def process_query(request):
    """API to convert NL → SQL and return results"""
    try:
        user_query = request.data.get("query", "")
        sql_query = convert_nl_to_sql(user_query)

        # Connect to MySQL
        conn = pymysql.connect(
            host="localhost",
            user="your_username",
            password="your_password",
            database="your_database"
        )
        cursor = conn.cursor()
        cursor.execute(sql_query)
        result = cursor.fetchall()
        conn.close()

        return Response({"query": sql_query, "result": result})

    except Exception as e:
        return Response({"error": str(e)}, status=400)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from django.http import JsonResponse
from django.views import View
from django.db import connection
from django.shortcuts import redirect
from .query_processor import generate_sql_query
from db.db_manager import execute_query
from .models import QueryHistory



class GenerateSQLQueryView(APIView):
    def post(self, request):
        natural_query = request.data.get("query", "").strip()
        if not natural_query:
            return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)

        sql_query = generate_sql_query(natural_query).strip()
        sql_query = sql_query.replace("```sql", "").replace("```", "").strip()
        QueryHistory.objects.create(user_query=natural_query, generated_sql=sql_query)

        return Response({"sql_query": sql_query}, status=status.HTTP_200_OK)

def home(request):
    return redirect("http://localhost:3000/")

"""def home(request):
    return redirect("http://localhost:3000/")
    """
class ExecuteSQLQueryView(View):
    def post(self, request, *args, **kwargs):
        sql_query = request.POST.get("sql_query", "")

        if not sql_query:
            return JsonResponse({"error": "No SQL query provided"}, status=400)

        try:
            with connection.cursor() as cursor:
                cursor.execute(sql_query)
                results = cursor.fetchall()

            return JsonResponse({"sql_query": sql_query, "executed": True, "results": results})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        
class QueryHistoryView(APIView):
    """Fetches the latest 10 stored SQL queries."""

    def get(self, request):
        queries = QueryHistory.objects.all().order_by('-created_at')[:10]  # Latest 10 queries
        data = [
            {
                "id": q.id,
                "user_query": q.user_query,
                "generated_sql": q.generated_sql,
                "created_at": q.created_at.strftime("%Y-%m-%d %H:%M:%S")
            }
            for q in queries
        ]
        return Response({"queries": data}, status=status.HTTP_200_OK)

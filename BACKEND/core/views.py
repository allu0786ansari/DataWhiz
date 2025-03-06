from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from django.shortcuts import redirect
from .query_processor import generate_sql_query

class GenerateSQLQueryView(APIView):
    def post(self, request):
        natural_query = request.data.get("query", "")
        if not natural_query:
            return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)

        sql_query = generate_sql_query(natural_query)
        return Response({"sql_query": sql_query}, status=status.HTTP_200_OK)

def home(request):
    return redirect("http://localhost:3000/")

"""def home(request):
    return redirect("http://localhost:3000/")
    """
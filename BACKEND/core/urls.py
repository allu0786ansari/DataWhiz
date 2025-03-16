from django.urls import path
from .views import home
from django.urls import path
from .views import GenerateSQLQueryView, ExecuteSQLQueryView, QueryHistoryView
'''
urlpatterns = [
    path("generate_sql/", GenerateSQLQueryView.as_view(), name="generate_sql"),
    path("execute_sql/", ExecuteSQLQueryView.as_view(), name="execute_sql"),
]
'''

urlpatterns = [
    path("", home, name="home"), 
    path("generate_sql/", GenerateSQLQueryView.as_view(), name="generate_sql"),
    path("execute_sql/", ExecuteSQLQueryView.as_view(), name="execute_sql"),
    path("query_history/", QueryHistoryView.as_view(), name="query_history"),  # ✅ Add this line

]

from django.urls import path
from .views import GenerateSQLQueryView, home

urlpatterns = [
    path("", home, name="home"), 
    path("generate_sql/", GenerateSQLQueryView.as_view(), name="generate_sql"),
]

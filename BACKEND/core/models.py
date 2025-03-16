from django.db import models
from django.utils.timezone import now

class QueryHistory(models.Model):
    user_query = models.TextField()  # Stores the user's natural language input
    generated_sql = models.TextField()  # Stores the generated SQL query
    created_at = models.DateTimeField(default=now)  # Timestamp for when the query was created

    def __str__(self):
        return f"Query: {self.user_query} at {self.created_at}"

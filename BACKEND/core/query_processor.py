import google.generativeai as genai
import os
import time
from django.conf import settings

# Ensure API key exists before using it
if settings.GOOGLE_API_KEY:
    genai.configure(api_key=settings.GOOGLE_API_KEY)
else:
    raise ValueError("GOOGLE_API_KEY is not set in settings.py or environment variables.")

def generate_sql_query(natural_text, retries=3, delay=2):
    prompt = f"Convert the following English statement into an SQL query:'{natural_text}'"
    
    for attempt in range(retries):
        try:
            model = genai.GenerativeModel('gemini-1.5-pro')
            response = model.generate_content(prompt)

            return response.text.strip()

        except Exception as e:
            if attempt < retries - 1:
                time.sleep(delay)  # Wait before retrying
                continue
            return f"Error generating SQL: {str(e)}"

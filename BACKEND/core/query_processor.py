import openai
import time
from django.conf import settings

def generate_sql_query(natural_text, retries=3, delay=2):
    prompt = f"Convert the following English statement into an SQL query:\n\n'{natural_text}'"
    
    for attempt in range(retries):
        try:
            client = openai.Client(api_key=settings.OPENAI_API_KEY)

            response = client.chat.completions.create(
                model="gpt-3.5-turbo",  # Use a model you have access to
                messages=[{"role": "user", "content": prompt}]
            )

            return response.choices[0].message.content  

        except openai.APIConnectionError:
            if attempt < retries - 1:
                time.sleep(delay)  # Wait before retrying
                continue
            return "Error generating SQL: Connection error. Please check your network."

        except Exception as e:
            return f"Error generating SQL: {str(e)}"

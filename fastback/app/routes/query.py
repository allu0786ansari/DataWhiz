from fastapi import APIRouter, HTTPException
import google.generativeai as genai
import os
from app.database import SessionLocal
from app.models import QueryLog

router = APIRouter()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@router.post("/query")
async def process_natural_query(query_text: str):
    try:
        # Gemini model to convert natural language to SQL
        prompt = f"Convert the following natural language query into optimized SQL: '{query_text}'"
        response = genai.chat(prompt)

        sql_query = response.text  # Extract SQL output

        # Log query in DB
        db = SessionLocal()
        query_log = QueryLog(query_text=query_text, sql_generated=sql_query)
        db.add(query_log)
        db.commit()
        db.close()

        return {"sql_query": sql_query}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")
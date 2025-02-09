import spacy
import re

# Load NLP model
nlp = spacy.load("en_core_web_sm")

def convert_nl_to_sql(nl_query):
    """
    Converts natural language query to SQL.
    """
    doc = nlp(nl_query.lower())

    # Example: Mapping keywords to SQL terms
    query_map = {
        "show": "SELECT * FROM",
        "list": "SELECT * FROM",
        "find": "SELECT",
        "count": "SELECT COUNT(*) FROM",
        "average": "SELECT AVG",
        "total": "SELECT SUM"
    }

    # Extract table name (example)
    table_name = "users"  # Modify as per database schema

    # Extract fields (if specified)
    columns = []
    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"]:
            columns.append(token.text)

    sql_query = f"{query_map.get(doc[0].text, 'SELECT')} {', '.join(columns) if columns else '*'} FROM {table_name};"
    
    return sql_query

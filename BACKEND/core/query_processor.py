import spacy
import re

# Load NLP model
nlp = spacy.load("en_core_web_sm")

# SQL Mapping
query_map = {
    "show": "SELECT * FROM",
    "list": "SELECT * FROM",
    "find": "SELECT",
    "count": "SELECT COUNT(*) FROM",
    "average": "SELECT AVG",
    "total": "SELECT SUM",
    "how many": "SELECT COUNT(*) FROM"
}

# Database Schema (Modify as per DB)
TABLES = {
    "users": ["id", "name", "email", "age", "city", "salary"],
    "employees": ["id", "name", "position", "department", "salary"],
    "orders": ["id", "customer_name", "order_date", "total_amount"],
}


def extract_table(nl_query):
    """Extract table name from query"""
    for table in TABLES.keys():
        if table in nl_query:
            return table
    return list(TABLES.keys())[0]  # Default to the first table


def extract_columns(nl_query, table):
    """Extract columns from query"""
    doc = nlp(nl_query.lower())
    columns = [token.text for token in doc if token.text in TABLES.get(table, [])]
    
    # If an aggregation function is used, apply it
    if "average" in nl_query:
        return [f"AVG({columns[0]})"] if columns else ["AVG(*)"]
    elif "total" in nl_query or "sum" in nl_query:
        return [f"SUM({columns[0]})"] if columns else ["SUM(*)"]
    elif "count" in nl_query or "how many" in nl_query:
        return ["COUNT(*)"]
    
    return columns or ["*"]


def extract_conditions(nl_query, table):
    """Extract WHERE conditions"""
    doc = nlp(nl_query.lower())
    conditions = []
    
    for token in doc:
        prev_token = token.head
        if prev_token and prev_token.text in TABLES.get(table, []):
            if token.like_num:  # Numeric condition
                conditions.append(f"{prev_token.text} = {token.text}")
            elif token.is_alpha:  # String condition
                conditions.append(f"{prev_token.text} = '{token.text}'")

    return " AND ".join(conditions) if conditions else ""


def convert_nl_to_sql(nl_query):
    """Convert Natural Language Query to SQL"""
    nl_query = nl_query.lower().strip()
    
    sql_operation = next((query_map[key] for key in query_map if key in nl_query), "SELECT * FROM")
    table = extract_table(nl_query)
    columns = extract_columns(nl_query, table)
    conditions = extract_conditions(nl_query, table)

    # Ensure we don't duplicate "FROM" in the final query
    if "FROM" not in sql_operation:
        sql_query = f"{sql_operation} {', '.join(columns)} FROM {table}"
    else:
        sql_query = f"{sql_operation} {', '.join(columns)}"

    if conditions:
        sql_query += f" WHERE {conditions}"
    sql_query += ";"
    
    return sql_query

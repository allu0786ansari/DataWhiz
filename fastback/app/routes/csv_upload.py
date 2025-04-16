from fastapi import APIRouter, UploadFile, HTTPException
import pandas as pd
from sqlalchemy import MetaData, Table, Column, String
from app.database import engine

router = APIRouter()

@router.post("/upload_csv")
async def upload_csv(file: UploadFile):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a CSV file.")

    df = pd.read_csv(file.file)
    table_name = file.filename.split(".")[0]

    # Dynamically create schema
    metadata = MetaData()
    columns = [Column(col, String(255)) for col in df.columns]  
    new_table = Table(table_name, metadata, *columns)

    metadata.create_all(engine)

    # Insert data into MySQL table
    with engine.connect() as conn:
        df.to_sql(table_name, conn, if_exists="replace", index=False, method="multi")

    return {"message": f"Table '{table_name}' created successfully!"}
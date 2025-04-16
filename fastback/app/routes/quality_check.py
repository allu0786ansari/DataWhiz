from fastapi import APIRouter, UploadFile, HTTPException
import pandas as pd

router = APIRouter()

@router.post("/validate_data")
async def validate_data(file: UploadFile):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a CSV file.")

    df = pd.read_csv(file.file)

    missing_values = df.isnull().sum().to_dict()
    duplicates = df.duplicated().sum()

    return {
        "missing_values": missing_values,
        "duplicates": duplicates,
        "status": "Data validation complete."
    }
import os
from fastapi import APIRouter, HTTPException
from datetime import datetime

router = APIRouter()
BACKUP_PATH = "backups"

@router.post("/backup")
async def backup_data():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = f"{BACKUP_PATH}/backup_{timestamp}.sql"
    
    os.makedirs(BACKUP_PATH, exist_ok=True)
    os.system(f"mysqldump -u user -p password db_name > {backup_file}")

    return {"message": f"Backup created at {backup_file}"}

@router.post("/restore")
async def restore_data(file_path: str):
    if not os.path.exists(file_path):
        raise HTTPException(status_code=400, detail="Backup file not found.")
    
    os.system(f"mysql -u user -p password db_name < {file_path}")
    return {"message": "Database restored successfully!"}
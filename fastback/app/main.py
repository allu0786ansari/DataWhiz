from fastapi import FastAPI
from app.routes import query, csv_upload, quality_check, visualizations, backup

app = FastAPI()

app.include_router(query.router, prefix="/api/query", tags=["Query Processing"])
app.include_router(csv_upload.router, prefix="/api/csv", tags=["CSV Upload"])
app.include_router(quality_check.router, prefix="/api/validate", tags=["Data Validation"])
app.include_router(visualizations.router, prefix="/api/visualize", tags=["Visualizations"])
app.include_router(backup.router, prefix="/api/backup", tags=["Backup & Restore"])
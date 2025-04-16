from fastapi import APIRouter
import pandas as pd
import matplotlib.pyplot as plt
import plotly.express as px
from io import BytesIO
import base64
from app.database import engine

router = APIRouter()

@router.get("/visualize/{table_name}")
async def visualize_data(table_name: str):
    with engine.connect() as conn:
        query = f"SELECT * FROM {table_name}"
        df = pd.read_sql(query, conn)

    fig = px.line(df, x=df.columns[0], y=df.columns[1], title="Data Trends")

    buf = BytesIO()
    fig.write_image(buf, format="png")
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()

    return {"image": img_base64}
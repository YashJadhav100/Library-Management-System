from fastapi import FastAPI
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import sqlite3
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "library.db")
PDF_DIR = os.path.join(BASE_DIR, "..", "pdfs")
FRONTEND_DIR = os.path.join(BASE_DIR, "..", "frontend")

@app.get("/books")
def get_books():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, title, filename FROM books")
    rows = cur.fetchall()
    conn.close()
    return [{"id": r[0], "title": r[1], "filename": r[2]} for r in rows]

@app.get("/search")
def search_books(q: str):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute(
        "SELECT id, title, filename FROM books WHERE extracted_text LIKE ?",
        (f"%{q}%",)
    )
    rows = cur.fetchall()
    conn.close()
    return [{"id": r[0], "title": r[1], "filename": r[2]} for r in rows]

@app.get("/pdf/{filename}")
def get_pdf(filename: str):
    pdf_path = os.path.join(PDF_DIR, filename)
    return FileResponse(pdf_path, media_type="application/pdf")

app.mount("/ui", StaticFiles(directory=FRONTEND_DIR, html=True), name="ui")

@app.get("/")
def root():
    return RedirectResponse("/ui/index.html")

import os
import sqlite3
from backend.services.pdf_service import extract_text_from_pdf

PDF_DIR = "pdfs"
DB_PATH = "backend/library.db"
SCHEMA_PATH = "backend/schema.sql"

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

with open(SCHEMA_PATH, "r") as f:
    cur.executescript(f.read())

for file in os.listdir(PDF_DIR):
    if file.endswith(".pdf"):
        print(f"Processing {file}")
        text = extract_text_from_pdf(os.path.join(PDF_DIR, file))
        title = file.replace(".pdf", "")

        cur.execute(
            "INSERT INTO books (title, filename, extracted_text) VALUES (?, ?, ?)",
            (title, file, text)
        )

conn.commit()
conn.close()

print("✅ All PDFs ingested successfully")

import sqlite3

DB_NAME = "library.db"

def get_connection():
    return sqlite3.connect(DB_NAME)

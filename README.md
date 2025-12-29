# 📚 Library Management System

A lightweight **Library Management System** built using **HTML, CSS, JavaScript, Python (FastAPI)**, and **SQLite**, designed to demonstrate **full-stack fundamentals**, **file-based content delivery**, and **deployment constraints handling** (local vs GitHub Pages).

This project allows users to **log in**, **browse a digital library of 50 PDF books**, **view or download them**, and **track activity history** all with a clean, professional UI.

## 🚀 Live Demo :- [https://yashjadhav100.github.io/Library-Management-System](https://yashjadhav100.github.io/Library-Management-System)

## 🧠 Project Motivation

This project was built to:

* Practice **real-world system design**
* Understand **frontend-backend separation**
* Handle **static vs dynamic hosting limitations**
* Showcase **PDF content handling**
* Demonstrate **localStorage-based authentication**
* Work with **SQLite databases**

## 🏗️ Architecture Overview

### 1️⃣ Frontend (Static)

* HTML
* CSS
* Vanilla JavaScript
* Hosted on **GitHub Pages**

### 2️⃣ Backend (Local)

* Python (FastAPI-style structure)
* SQLite database
* Serves book metadata and PDFs

## 📂 Project Structure

```
Library-Management-System/
│
├── backend/
│   ├── main.py              # Backend entry point
│   ├── database.py          # SQLite DB connection
│   ├── models.py            # Data models
│   ├── schema.sql           # Database schema
│   ├── library.db           # SQLite database
│   └── services/
│       └── pdf_service.py   # PDF handling logic
│
├── frontend/
│   ├── index.html           # Login page
│   ├── dashboard.html       # Main dashboard
│   ├── script.js            # App logic
│   └── style.css            # UI styling
│
├── pdfs/
│   ├── book_01.pdf
│   ├── book_02.pdf
│   ├── ...
│   └── book_50.pdf
│
├── seed_data.py             # Script to seed DB
└── README.md
```

## ✨ Features

### 🔐 Authentication (Demo)

* Username-based login
* No password (demo system)
* Uses `localStorage`

### 📖 Book Management

* Displays **50 PDF books**
* View PDF in browser
* Download PDF locally

### 🕵️ User Activity Tracking

* Tracks:

  * Viewed books
  * Downloaded books
* Stores last 5 activities per user

### 🔍 Search

* Search books by title or keyword

## ⚙️ How It Works (Important)

### 🔹 Local Development (Full Stack)

When running locally:

* Backend serves:

  * `/books` → JSON list of books
  * `/pdf/{filename}` → PDF files
* Frontend fetches data using `fetch()`

**Command to run backend:**

```bash
python backend/main.py
```

Then open:

```
frontend/index.html
```

### 🔹 GitHub Pages (Frontend Only)

GitHub Pages **does NOT support backend APIs**.

So we adapted the frontend logic to:

* **Directly load PDFs from `/pdfs/` folder**
* **Generate book list dynamically in JavaScript**
* **Disable API calls when backend is unavailable**

This ensures:

* PDFs are still **viewable**
* PDFs are **downloadable**
* UI remains fully functional

## 🧩 Key Challenge Solved

### ❌ Problem

GitHub Pages cannot:

* Run Python
* Serve dynamic APIs
* Access SQLite

### ✅ Solution

* Backend kept for **local demo**
* Frontend switched to **static PDF loading**
* JavaScript detects environment and adjusts behavior

This mirrors **real-world production constraints**.

## 🛠️ Technologies Used

| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | HTML, CSS, JavaScript |
| Backend  | Python                |
| Database | SQLite                |
| Hosting  | GitHub Pages          |
| Storage  | PDF File System       |
| Auth     | Browser localStorage  |

## 📌 What This Project Demonstrates

* Full-stack thinking
* API vs static hosting awareness
* Clean frontend design
* File-based content delivery
* SQLite usage
* JavaScript DOM manipulation
* Real-world deployment trade-offs

## 🔮 Future Enhancements

* User roles (Admin/User)
* Upload books via UI
* Password-based authentication
* Cloud backend (AWS / Render / Railway)
* Pagination for large libraries
* PDF previews with thumbnails

## 👤 Author

**Yash Jadhav**
Graduate Student, Computer Science
Syracuse University

🔗 GitHub: [https://github.com/YashJadhav100](https://github.com/YashJadhav100) 

🔗 LinkedIn: [https://www.linkedin.com/in/yashvjadhav](https://www.linkedin.com/in/yashvjadhav)

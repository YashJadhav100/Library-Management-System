// ===============================
// GitHub Pages – Static Library JS
// ===============================

// IMPORTANT:
// GitHub Pages cannot list directories dynamically.
// So we maintain a single source of truth here.
const TOTAL_BOOKS = 50; // <-- change ONLY this if PDFs increase
const PDF_BASE_PATH = "../pdfs/";

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard")) {
    checkAuth();
    loadBooks();
    loadActivity();
  }
});

/* ---------- AUTH ---------- */
function login() {
  const user = document.getElementById("username").value.trim();
  if (!user) {
    alert("Enter username");
    return;
  }
  localStorage.setItem("user", user);
  window.location.href = "dashboard.html";
}

function register() {
  login();
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

function checkAuth() {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  document.getElementById("welcome").innerText = `Welcome, ${user}`;
}

/* ---------- LOAD BOOKS ---------- */
function loadBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  const books = [];
  for (let i = 1; i <= TOTAL_BOOKS; i++) {
    const num = String(i).padStart(2, "0");
    books.push(`book_${num}.pdf`);
  }

  renderBooks(books);
}

/* ---------- SEARCH ---------- */
function searchBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  const books = [];
  for (let i = 1; i <= TOTAL_BOOKS; i++) {
    const num = String(i).padStart(2, "0");
    books.push(`book_${num}.pdf`);
  }

  if (!query) {
    renderBooks(books);
    return;
  }

  const filtered = books.filter(book =>
    book.toLowerCase().includes(query)
  );

  renderBooks(filtered);
}

/* ---------- RENDER ---------- */
function renderBooks(books) {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  if (books.length === 0) {
    list.innerHTML = "<p>No matching books found.</p>";
    return;
  }

  books.forEach(file => {
    const title = file.replace(".pdf", "").replace("_", " ");

    const div = document.createElement("div");
    div.className = "book-card";
    div.innerHTML = `
      <b>${title}</b><br/>
      <a href="${PDF_BASE_PATH}${file}" target="_blank"
         onclick="trackActivity('Viewed ${title}')">View</a>
      |
      <a href="${PDF_BASE_PATH}${file}" download
         onclick="trackActivity('Downloaded ${title}')">Download</a>
    `;
    list.appendChild(div);
  });
}

/* ---------- ACTIVITY ---------- */
function trackActivity(action) {
  let activity = JSON.parse(localStorage.getItem("activity")) || [];
  activity.unshift(action);
  activity = activity.slice(0, 5);
  localStorage.setItem("activity", JSON.stringify(activity));
  loadActivity();
}

function loadActivity() {
  const list = document.getElementById("activityList");
  const activity = JSON.parse(localStorage.getItem("activity")) || [];
  list.innerHTML = "";

  activity.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

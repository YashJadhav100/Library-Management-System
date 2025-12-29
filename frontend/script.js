/* ================================
   CONFIG
================================ */
const BASE_URL = "https://yashjadhav100.github.io/Library-Management-System";

/* ================================
   STATIC BOOK DATA (GitHub Pages)
================================ */
const BOOKS = [
  { title: "book_01", filename: "book_01.pdf" },
  { title: "book_02", filename: "book_02.pdf" },
  { title: "book_03", filename: "book_03.pdf" },
  { title: "book_04", filename: "book_04.pdf" },
  { title: "book_05", filename: "book_05.pdf" },
  { title: "book_06", filename: "book_06.pdf" },
  { title: "book_07", filename: "book_07.pdf" },
  { title: "book_08", filename: "book_08.pdf" },
  { title: "book_09", filename: "book_09.pdf" },
  { title: "book_10", filename: "book_10.pdf" }
];

/* ================================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard")) {
    checkAuth();
    loadBooks();
    loadActivity();
  }
});

/* ================================
   AUTH
================================ */
function login() {
  const user = document.getElementById("username").value.trim();
  if (!user) return alert("Enter username");

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
  if (!user) window.location.href = "index.html";

  document.getElementById("welcome").innerText = `Welcome, ${user}`;
}

/* ================================
   LOAD BOOKS
================================ */
function loadBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  if (BOOKS.length === 0) {
    list.innerHTML = "<p>No books available.</p>";
    return;
  }

  renderBooks(BOOKS);
}

/* ================================
   SEARCH
================================ */
function searchBooks() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  if (!q) {
    renderBooks(BOOKS);
    return;
  }

  const filtered = BOOKS.filter(b =>
    b.title.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    list.innerHTML = "<p>No matching books found.</p>";
    return;
  }

  renderBooks(filtered);
}

/* ================================
   RENDER
================================ */
function renderBooks(books) {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  books.forEach(book => {
    const div = document.createElement("div");
    div.className = "book-card";

    div.innerHTML = `
      <b>${book.title}</b><br/>
      <a href="${BASE_URL}/pdfs/${book.filename}" target="_blank"
         onclick="trackActivity('Viewed ${book.title}')">View</a>
      |
      <a href="${BASE_URL}/pdfs/${book.filename}" download
         onclick="trackActivity('Downloaded ${book.title}')">Download</a>
    `;

    list.appendChild(div);
  });
}

/* ================================
   ACTIVITY
================================ */
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

  activity.forEach(a => {
    const li = document.createElement("li");
    li.innerText = a;
    list.appendChild(li);
  });
}

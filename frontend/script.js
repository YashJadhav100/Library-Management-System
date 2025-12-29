// frontend/script.js
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("bookList")) {
    loadBooks();
    loadActivity();
    loadUser();
  }
});

/* ---------- USER ---------- */
function loadUser() {
  const user = localStorage.getItem("user") || "Guest";
  const el = document.getElementById("welcome");
  if (el) el.innerText = `Welcome, ${user}`;
}

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

/* ---------- BOOKS ---------- */
const TOTAL_BOOKS = 50;

function loadBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  for (let i = 1; i <= TOTAL_BOOKS; i++) {
    const num = String(i).padStart(2, "0");
    const title = `book_${num}`;
    const pdfPath = `../pdfs/${title}.pdf`;

    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <strong>${title}</strong><br/><br/>
      <a href="${pdfPath}" target="_blank"
         onclick="trackActivity('Viewed ${title}')">View</a>
      &nbsp; | &nbsp;
      <a href="${pdfPath}" download
         onclick="trackActivity('Downloaded ${title}')">Download</a>
    `;

    list.appendChild(card);
  }
}

/* ---------- SEARCH ---------- */
function searchBooks() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".book-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? "block" : "none";
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
  if (!list) return;

  list.innerHTML = "";
  const activity = JSON.parse(localStorage.getItem("activity")) || [];

  activity.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

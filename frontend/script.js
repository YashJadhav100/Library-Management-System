document.addEventListener("DOMContentLoaded", () => {
  if (location.pathname.includes("dashboard")) {
    checkAuth();
    loadBooks();
    loadActivity();
  }
});

/* ---------- AUTH ---------- */
function login() {
  const user = document.getElementById("username").value.trim();
  if (!user) return alert("Enter username");
  localStorage.setItem("user", user);
  location.href = "dashboard.html";
}

function register() {
  login();
}

function logout() {
  localStorage.clear();
  location.href = "index.html";
}

function checkAuth() {
  const user = localStorage.getItem("user");
  if (!user) location.href = "index.html";
  document.getElementById("welcome").innerText = `Welcome, ${user}`;
}

/* ---------- LOAD BOOKS (STATIC) ---------- */
function loadBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  const books = [];
  for (let i = 1; i <= 50; i++) {
    const num = String(i).padStart(2, "0");
    books.push({
      title: `book_${num}`,
      file: `../pdfs/book_${num}.pdf`
    });
  }

  books.forEach(book => {
    const div = document.createElement("div");
    div.className = "book-card";
    div.innerHTML = `
      <strong>${book.title}</strong><br/>
      <a href="${book.file}" target="_blank"
         onclick="trackActivity('Viewed ${book.title}')">View</a>
      |
      <a href="${book.file}" download
         onclick="trackActivity('Downloaded ${book.title}')">Download</a>
    `;
    list.appendChild(div);
  });
}

/* ---------- SEARCH ---------- */
function searchBooks() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".book-card");

  cards.forEach(card => {
    card.style.display =
      card.innerText.toLowerCase().includes(q) ? "block" : "none";
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

  activity.forEach(a => {
    const li = document.createElement("li");
    li.innerText = a;
    list.appendChild(li);
  });
}

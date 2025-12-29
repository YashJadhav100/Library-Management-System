// ==========================
// CONFIG
// ==========================
const TOTAL_BOOKS = 50;
const BOOKS_PER_PAGE = 10;
const PDF_FOLDER = "../pdfs";

let currentPage = 1;

// ==========================
// PAGE INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard")) {
    protectDashboard();
    loadUser();
    renderBooks();
    renderActivity();
  }
});

// ==========================
// LOGIN / AUTH
// ==========================
function login() {
  const input = document.querySelector("#username");
  if (!input || !input.value.trim()) {
    alert("Please enter a username");
    return;
  }

  localStorage.setItem("username", input.value.trim());
  window.location.href = "dashboard.html";
}

function register() {
  login(); // demo system
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

function protectDashboard() {
  const user = localStorage.getItem("username");
  if (!user) {
    window.location.href = "index.html";
  }
}

function loadUser() {
  const user = localStorage.getItem("username") || "User";
  const el = document.querySelector("#usernameDisplay");
  if (el) el.textContent = user;
}

// ==========================
// BOOK RENDER (PERFORMANCE SAFE)
// ==========================
function renderBooks(searchQuery = "") {
  const container = document.querySelector("#booksContainer");
  if (!container) return;

  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  const start = (currentPage - 1) * BOOKS_PER_PAGE + 1;
  const end = Math.min(start + BOOKS_PER_PAGE - 1, TOTAL_BOOKS);

  for (let i = start; i <= end; i++) {
    const num = String(i).padStart(2, "0");
    const bookName = `book_${num}`;

    if (searchQuery && !bookName.includes(searchQuery)) continue;

    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <h3>${bookName}</h3>
      <div>
        <a href="${PDF_FOLDER}/${bookName}.pdf" target="_blank"
           onclick="logActivity('Viewed ${bookName}')">View</a>
        &nbsp;|&nbsp;
        <a href="${PDF_FOLDER}/${bookName}.pdf" download
           onclick="logActivity('Downloaded ${bookName}')">Download</a>
      </div>
    `;

    fragment.appendChild(card);
  }

  container.appendChild(fragment);
  renderPagination();
}

// ==========================
// PAGINATION
// ==========================
function renderPagination() {
  let pagination = document.querySelector("#pagination");

  if (!pagination) {
    pagination = document.createElement("div");
    pagination.id = "pagination";
    pagination.style.marginTop = "20px";
    document.querySelector("#booksContainer").after(pagination);
  }

  pagination.innerHTML = "";

  const totalPages = Math.ceil(TOTAL_BOOKS / BOOKS_PER_PAGE);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.disabled = i === currentPage;

    btn.onclick = () => {
      currentPage = i;
      searchBooks();
    };

    pagination.appendChild(btn);
  }
}

// ==========================
// SEARCH
// ==========================
function searchBooks() {
  currentPage = 1;
  const query =
    document.querySelector("#searchInput")?.value.toLowerCase() || "";
  renderBooks(query);
}

// ==========================
// ACTIVITY
// ==========================
function logActivity(action) {
  let activity = JSON.parse(localStorage.getItem("activity")) || [];
  activity.unshift(action);
  activity = activity.slice(0, 5);
  localStorage.setItem("activity", JSON.stringify(activity));
  renderActivity();
}

function renderActivity() {
  const list = document.querySelector("#activityList");
  if (!list) return;

  list.innerHTML = "";
  const activity = JSON.parse(localStorage.getItem("activity")) || [];

  activity.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("dashboard")) {
    checkAuth();
    loadBooks();
    loadActivity();
  }
});

/* ---------- AUTH ---------- */
function login() {
  const user = document.getElementById("username").value;
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

/* ---------- BOOK DATA (STATIC) ---------- */
const books = Array.from({ length: 50 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    title: `book_${num}`,
    file: `pdfs/book_${num}.pdf`
  };
});

/* ---------- LOAD BOOKS ---------- */
function loadBooks() {
  renderBooks(books);
}

/* ---------- SEARCH ---------- */
function searchBooks() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();

  if (!q) {
    renderBooks(books);
    return;
  }

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(q)
  );

  renderBooks(filtered);
}

/* ---------- RENDER ---------- */
function renderBooks(bookList) {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  if (bookList.length === 0) {
    list.innerHTML = "<p>No matching books found.</p>";
    return;
  }

  bookList.forEach(book => {
    const div = document.createElement("div");
    div.className = "book-card";
    div.innerHTML = `
      <b>${book.title}</b><br/>
      <a href="${book.file}" target="_blank"
         onclick="trackActivity('Viewed ${book.title}')">View</a>
      |
      <a href="${book.file}" download
         onclick="trackActivity('Downloaded ${book.title}')">Download</a>
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

  activity.forEach(a => {
    const li = document.createElement("li");
    li.innerText = a;
    list.appendChild(li);
  });
}

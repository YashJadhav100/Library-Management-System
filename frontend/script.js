// ✅ detect if running on GitHub Pages
const IS_GITHUB_PAGES = window.location.hostname.includes("github.io");

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

/* ---------- LOAD ALL BOOKS ---------- */
async function loadBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "Loading books...";

  try {
    const res = await fetch(`${API}/books`);
    if (!res.ok) throw new Error("Books API failed");

    const books = await res.json();

    if (books.length === 0) {
      list.innerHTML = "<p>No books available.</p>";
      return;
    }

    renderBooks(books);
  } catch (err) {
    console.error(err);

    // ✅ GitHub Pages fallback (STATIC)
    if (IS_GITHUB_PAGES) {
      const books = [];
      for (let i = 1; i <= 50; i++) {
        const num = String(i).padStart(2, "0");
        books.push({
          title: `book_${num}`,
          filename: `book_${num}.pdf`
        });
      }
      renderBooks(books);
    } else {
      list.innerHTML = "<p style='color:red'>Failed to load books.</p>";
    }
  }
}

/* ---------- SEARCH ---------- */
async function searchBooks() {
  const q = document.getElementById("searchInput").value.trim();

  if (!q) {
    loadBooks();
    return;
  }

  const list = document.getElementById("bookList");
  list.innerHTML = "Searching...";

  try {
    const res = await fetch(`${API}/search?q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error("Search API failed");

    const books = await res.json();

    if (books.length === 0) {
      list.innerHTML = "<p>No matching books found.</p>";
      return;
    }

    renderBooks(books);
  } catch (err) {
    console.error(err);

    // ✅ simple client-side search fallback
    if (IS_GITHUB_PAGES) {
      const books = [];
      for (let i = 1; i <= 50; i++) {
        const num = String(i).padStart(2, "0");
        const title = `book_${num}`;
        if (title.includes(q)) {
          books.push({ title, filename: `${title}.pdf` });
        }
      }
      renderBooks(books);
    } else {
      list.innerHTML = "<p style='color:red'>Search failed.</p>";
    }
  }
}

/* ---------- RENDER ---------- */
function renderBooks(books) {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  books.forEach(book => {
    const div = document.createElement("div");
    div.className = "book-card";

    // ✅ ONLY CHANGE IS HERE
    const pdfUrl = IS_GITHUB_PAGES
      ? `../pdfs/${book.filename}`
      : `${API}/pdf/${book.filename}`;

    div.innerHTML = `
      <b>${book.title}</b><br/>
      <a href="${pdfUrl}" target="_blank"
         onclick="trackActivity('Viewed ${book.title}')">View</a>
      |
      <a href="${pdfUrl}" download
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

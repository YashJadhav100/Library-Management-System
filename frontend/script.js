// ==========================
// CONFIG
// ==========================
const TOTAL_BOOKS = 50;
const PDF_FOLDER = "../pdfs"; // do NOT change structure

// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  loadUser();
  loadBooks();
});

// ==========================
// USER
// ==========================
function loadUser() {
  const user = localStorage.getItem("username") || "User";
  const el = document.querySelector("#usernameDisplay");
  if (el) el.innerText = user;
}

// ==========================
// BOOK LOADER (STATIC)
// ==========================
function loadBooks() {
  const container = document.querySelector("#booksContainer");

  if (!container) {
    console.error("booksContainer not found");
    return;
  }

  container.innerHTML = "";

  for (let i = 1; i <= TOTAL_BOOKS; i++) {
    const num = String(i).padStart(2, "0");
    const bookName = `book_${num}`;
    const pdfPath = `${PDF_FOLDER}/${bookName}.pdf`;

    const card = document.createElement("div");
    card.className = "book-card";
    card.setAttribute("data-title", bookName.toLowerCase());

    card.innerHTML = `
      <h3>${bookName}</h3>
      <div>
        <a href="${pdfPath}" target="_blank"
           onclick="logActivity('Viewed ${bookName}')">View</a>
        &nbsp;|&nbsp;
        <a href="${pdfPath}" download
           onclick="logActivity('Downloaded ${bookName}')">Download</a>
      </div>
    `;

    container.appendChild(card);
  }
}

// ==========================
// SEARCH (uses existing input)
// ==========================
function searchBooks() {
  const query = document.querySelector("#searchInput")?.value.toLowerCase() || "";
  const books = document.querySelectorAll(".book-card");

  books.forEach(book => {
    const title = book.dataset.title;
    book.style.display = title.includes(query) ? "block" : "none";
  });
}

// ==========================
// ACTIVITY (local only)
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

// ==========================
// LOGOUT
// ==========================
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

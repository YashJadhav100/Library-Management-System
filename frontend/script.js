// ===============================
// AUTH CHECK
// ===============================
const username = localStorage.getItem("username");
if (!username) {
  window.location.href = "index.html";
}

document.getElementById("usernameDisplay").innerText = username;

// ===============================
// BOOK CONFIG (STATIC FOR GITHUB PAGES)
// ===============================
const TOTAL_BOOKS = 50;
const PDF_BASE_PATH = "../pdfs";

// ===============================
// LOAD BOOKS
// ===============================
function loadBooks() {
  const container = document.getElementById("booksContainer");
  container.innerHTML = "";

  for (let i = 1; i <= TOTAL_BOOKS; i++) {
    const bookId = `book_${String(i).padStart(2, "0")}`;
    const pdfPath = `${PDF_BASE_PATH}/${bookId}.pdf`;

    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <h3>${bookId}</h3>
      <p>
        <a href="${pdfPath}" target="_blank" onclick="logActivity('Viewed ${bookId}')">View</a>
        |
        <a href="${pdfPath}" download onclick="logActivity('Downloaded ${bookId}')">Download</a>
      </p>
    `;

    container.appendChild(card);
  }
}

// ===============================
// SEARCH
// ===============================
function searchBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const books = document.querySelectorAll(".book-card");

  books.forEach(book => {
    const title = book.querySelector("h3").innerText.toLowerCase();
    book.style.display = title.includes(query) ? "block" : "none";
  });
}

// ===============================
// ACTIVITY TRACKING
// ===============================
function logActivity(action) {
  let activity = JSON.parse(localStorage.getItem("activity")) || [];
  activity.unshift(action);
  activity = activity.slice(0, 5);
  localStorage.setItem("activity", JSON.stringify(activity));
  renderActivity();
}

function renderActivity() {
  const list = document.getElementById("activityList");
  list.innerHTML = "";

  const activity = JSON.parse(localStorage.getItem("activity")) || [];
  activity.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// ===============================
// INIT
// ===============================
loadBooks();
renderActivity();

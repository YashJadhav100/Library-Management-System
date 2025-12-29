// frontend/script.js

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  loadBooks();
  loadActivity();
});

const TOTAL_BOOKS = 50;

/* ---------- AUTH ---------- */
function checkAuth() {
  const user = localStorage.getItem("user") || "Guest";
  document.getElementById("welcome").innerText = `Welcome, ${user}`;
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

/* ---------- LOAD BOOKS ---------- */
function loadBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  for (let i = 1; i <= TOTAL_BOOKS; i++) {
    const num = String(i).padStart(2, "0");
    const fileName = `book_${num}.pdf`;
    const bookTitle = `book_${num}`;

    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <h4>${bookTitle}</h4>
      <div class="actions">
        <a href="../pdfs/${fileName}" target="_blank"
           onclick="trackActivity('Viewed ${bookTitle}')">View</a>
        <a href="../pdfs/${fileName}" download
           onclick="trackActivity('Downloaded ${bookTitle}')">Download</a>
      </div>
    `;

    list.appendChild(card);
  }
}

/* ---------- SEARCH ---------- */
function searchBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".book-card");

  cards.forEach(card => {
    const title = card.querySelector("h4").innerText.toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
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
  list.innerHTML = "";
  const activity = JSON.parse(localStorage.getItem("activity")) || [];

  activity.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

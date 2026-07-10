document.addEventListener("DOMContentLoaded", () => {
  // 1. Setup Navbar Dynamically
  setupSharedNavbar();
});

function setupSharedNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navLinks = document.getElementById("navLinks");
  const navUserArea = document.getElementById("navUserArea");
  if (!navLinks) return;

  const currentPath = window.location.pathname;
  const isLibrary = currentPath.includes("library.html");
  const isDashboard = currentPath.includes("dashboard.html");
  const isPractice = currentPath.includes("practice.html");
  const isHome = currentPath.includes("index.html") || currentPath.endsWith("/");

  // 1. Populate Navigation Links (Yoga Library | Dashboard | Practice | Home)
  let linksHTML = `<li><a href="library.html" class="${isLibrary ? 'active' : ''}">Yoga Library</a></li>`;
  if (user) {
    linksHTML += `
      <li><a href="dashboard.html" class="${isDashboard ? 'active' : ''}">Dashboard</a></li>
      <li><a href="practice.html" class="${isPractice ? 'active' : ''}">Practice</a></li>
    `;
  }
  linksHTML += `<li><a href="index.html" class="${isHome ? 'active' : ''}">Home</a></li>`;
  navLinks.innerHTML = linksHTML;

  // 2. Populate User Area (Email & Sign Out, or Sign Up & Log In)
  if (navUserArea) {
    if (user) {
      navUserArea.innerHTML = `
        <span class="nav-user-email">${user.email}</span>
        <button class="nav-btn" id="navLogoutBtn">Sign Out</button>
      `;
      document.getElementById("navLogoutBtn")?.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "login.html";
      });
    } else {
      navUserArea.innerHTML = `
        <a href="signup.html" class="nav-signup-link">Sign Up</a>
        <button class="nav-btn" onclick="window.location.href='login.html'">Log In</button>
      `;
    }
  }
}

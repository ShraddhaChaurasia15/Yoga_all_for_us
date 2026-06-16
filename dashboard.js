const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const carousel = document.querySelector('.carousel-items');

leftArrow.addEventListener('click', () => {
  carousel.scrollBy({ left: -300, behavior: 'smooth' });
});

rightArrow.addEventListener('click', () => {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });
});
const calendarDates = document.querySelectorAll(".calendar-date");
const today = new Date();

// Highlight today's date
const todayDate = today.getDate();
calendarDates.forEach((dateElement) => {
  if (parseInt(dateElement.textContent) === todayDate) {
    dateElement.classList.add("calendar-today");
  }

  // Toggle streak on click
  dateElement.addEventListener("click", () => {
    dateElement.classList.toggle("checked");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".bar");

  bars.forEach((bar) => {
    bar.addEventListener("mouseover", () => {
      bar.style.backgroundColor = "#ff8800";
    });

    bar.addEventListener("mouseout", () => {
      bar.style.backgroundColor = bar.classList.contains("highlight")
        ? "#ffcc00"
        : "#276488";
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".bar");
  
    bars.forEach((bar) => {
      bar.addEventListener("mouseover", () => {
        bar.style.backgroundColor = "#ff8800";
      });
  
      bar.addEventListener("mouseout", () => {
        bar.style.backgroundColor = bar.classList.contains("highlight")
          ? "#ffcc00"
          : "#276488";
      });
    });
  });

  // JavaScript to track user activity and update the activity graph

let activityDuration = 0; // In seconds
let activityInterval = 1; // Check every 1 second for activity
let lastActivityTime = Date.now(); // Track the last activity time
let inactivityTimeout = 5 * 60 * 1000; // Inactivity period (5 minutes)
let weeklyActivity = [0, 0, 0, 0, 0, 0, 0]; // Store activity for each day of the week (Sunday-Saturday)

// Function to detect activity
function detectActivity() {
  const currentTime = Date.now();
  if (currentTime - lastActivityTime <= inactivityTimeout) {
    activityDuration += activityInterval; // Increase activity duration by interval
  }
  lastActivityTime = currentTime;
}

// Function to update the "Hours Activity" section with the active time
function updateActivityDisplay() {
  const hours = Math.floor(activityDuration / 3600); // Convert seconds to hours
  const minutes = Math.floor((activityDuration % 3600) / 60); // Convert seconds to minutes
  const seconds = activityDuration % 60; // Remaining seconds
  const activeTimeText = `${hours}h ${minutes}m`;

  // Update the displayed time in the dashboard
  document.querySelector('.hours-info p strong').innerText = activeTimeText;
}

// Update the weekly activity graph (bar height) based on activity for each day
function updateActivityGraph() {
  // Example activity data (replace with actual calculation)
  let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  days.forEach((day, index) => {
    const bar = document.getElementById(day);
    const activityPercent = (weeklyActivity[index] / 10) * 100; // Activity is scaled by a factor (example)
    bar.style.height = `${activityPercent}%`;
  });
}

// Track user activity (using mouse movement and keypress)
document.addEventListener('mousemove', detectActivity);
document.addEventListener('keydown', detectActivity);

// Update activity every second
setInterval(() => {
  updateActivityDisplay();
  updateActivityGraph();
}, 1000);

// Reset weekly data (if needed)
setInterval(() => {
  weeklyActivity = [0, 0, 0, 0, 0, 0, 0]; // Reset for the new week
}, 7 * 24 * 60 * 60 * 1000); // Reset every 7 days


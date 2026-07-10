// ============================
// HEATMAP
// ============================

function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

async function loadSessions(userId) {
    try {
        const response = await fetch(
            `http://localhost:5001/api/practice/${userId}`
        );
        const data = await response.json();
        console.log("Sessions from MongoDB:", data);
        return data.sessions || [];
    } catch(err) {
        console.error(err);
        return [];
    }
}

async function loadUserProfile(userId) {
    try {
        const response = await fetch(
            `http://localhost:5001/api/auth/profile/${userId}`
        );
        if (response.ok) {
            return await response.json();
        }
    } catch (err) {
        console.error("Error loading user profile:", err);
    }
    return null;
}

function calculateCurrentStreak(sessions) {
    if (!sessions || sessions.length === 0) return 0;

    const practicedDays = new Set(
        sessions.map(session => getLocalDateString(new Date(session.practicedAt)))
    );

    let streak = 0;
    let current = new Date();
    const todayString = getLocalDateString(current);

    if (!practicedDays.has(todayString)) {
        current.setDate(current.getDate() - 1);
        const yesterdayString = getLocalDateString(current);
        if (!practicedDays.has(yesterdayString)) {
            return 0;
        }
    }

    while (true) {
        const checkStr = getLocalDateString(current);
        if (practicedDays.has(checkStr)) {
            streak++;
            current.setDate(current.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}

function calculateLongestStreak(sessions) {
    if (!sessions || sessions.length === 0) return 0;

    const practicedDays = [...new Set(
        sessions.map(session => getLocalDateString(new Date(session.practicedAt)))
    )].sort();

    let maxStreak = 0;
    let currentStreak = 0;
    let prevDate = null;

    practicedDays.forEach(dateStr => {
        const currentDate = new Date(dateStr);
        if (!prevDate) {
            currentStreak = 1;
        } else {
            const diffTime = Math.abs(currentDate - prevDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                currentStreak++;
            } else if (diffDays > 1) {
                currentStreak = 1;
            }
        }
        if (currentStreak > maxStreak) {
            maxStreak = currentStreak;
        }
        prevDate = currentDate;
    });

    return maxStreak;
}

function generateHeatmap(sessions) {
    console.log("Heatmap Called");
    const heatmap = document.getElementById("heatmap");
    if (!heatmap) return;

    heatmap.innerHTML = "";

    const dateCounts = {};
    sessions.forEach(session => {
        const dateStr = getLocalDateString(new Date(session.practicedAt));
        dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
    });

    console.log("Practiced Date Counts:", dateCounts);

    const today = new Date();

    for (let i = 179; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateStr = getLocalDateString(date);
        const count = dateCounts[dateStr] || 0;

        const box = document.createElement("div");
        box.classList.add("box");
        box.title = `${dateStr}: ${count} session(s)`;

        if (count > 0) {
            if (count === 1) {
                box.classList.add("level1");
            } else if (count === 2) {
                box.classList.add("level2");
            } else {
                box.classList.add("level3");
            }
        }

        heatmap.appendChild(box);
    }
}

// ============================
// RECOMMENDED POSES
// ============================

function renderRecommendedPoses(goal) {
    const recommendContainer = document.getElementById("recommendContainer");
    if (!recommendContainer || typeof yogaPoses === "undefined") return;

    recommendContainer.innerHTML = "";

    // Filter poses based on recommendation goal
    let filteredPoses = [];
    if (goal === "Weight Loss") {
        filteredPoses = yogaPoses.filter(p => ["warrior1", "warrior2", "triangle", "crow"].includes(p.id));
    } else if (goal === "Flexibility") {
        filteredPoses = yogaPoses.filter(p => ["downwarddog", "cobra", "triangle", "bridge", "camel"].includes(p.id));
    } else if (goal === "Stress Relief") {
        filteredPoses = yogaPoses.filter(p => ["mountain", "tree", "downwarddog", "cobra"].includes(p.id));
    } else if (goal === "Weight Gain") {
        filteredPoses = yogaPoses.filter(p => ["warrior1", "warrior2", "bridge", "crow"].includes(p.id));
    }

    // Fallback: If no match or too few poses, default to Beginner level
    if (filteredPoses.length < 3) {
        filteredPoses = yogaPoses.filter(pose => pose.level === "Beginner");
    }

    const recommended = filteredPoses.slice(0, 6);

    recommended.forEach(pose => {
        recommendContainer.innerHTML += `
        <div class="recommend-card">
            <img src="${pose.image}" alt="${pose.name}">
            <div class="recommend-content">
                <span class="level">
                    ${pose.level}
                </span>
                <h3>${pose.name}</h3>
                <h4>${pose.sanskrit}</h4>
                <p>${pose.benefits[0]}</p>
                <div class="card-buttons">
                    <button
                        class="details-btn"
                        onclick="location.href='poseDetails.html?id=${pose.id}'">
                        View Details
                    </button>
                    <button
                        class="practice-btn"
                        onclick="location.href='practice.html?id=${pose.id}'">
                        Practice
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}

// ============================
// PREFERENCES MODAL AND IIFE
// ============================

(async function () {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    // Load and populate user profile from MongoDB
    let profile = await loadUserProfile(user.id);
    if (profile) {
        const welcomeEl = document.querySelector(".welcome");
        if (welcomeEl) {
            welcomeEl.textContent = `Namaste, ${profile.name} 👋`;
        }
        // Initial rendering of recommendations
        renderRecommendedPoses(profile.fitnessGoal);
    } else {
        renderRecommendedPoses("Weight Loss");
    }

    // Setup Preferences Modal Toggling & Logic
    const prefBtn = document.querySelector(".preferences");
    const modal = document.getElementById("preferencesModal");
    const closeBtn = document.getElementById("closeModalBtn");
    const prefForm = document.getElementById("preferencesForm");

    if (prefBtn && modal && closeBtn && prefForm) {
        prefBtn.addEventListener("click", () => {
            // Populate modal with current settings
            if (profile) {
                document.getElementById("prefAge").value = profile.age || "";
                document.getElementById("prefGender").value = profile.gender || "Male";
                document.getElementById("prefHeight").value = profile.height || "";
                document.getElementById("prefWeight").value = profile.weight || "";
                document.getElementById("prefGoal").value = profile.fitnessGoal || "Weight Loss";
                document.getElementById("prefInjuries").value = profile.injuries || "";
                document.getElementById("prefMedical").value = profile.medicalCondition || "";
            }
            modal.classList.add("active");
        });

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });

        prefForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const updatedData = {
                age: Number(document.getElementById("prefAge").value),
                gender: document.getElementById("prefGender").value,
                height: Number(document.getElementById("prefHeight").value),
                weight: Number(document.getElementById("prefWeight").value),
                fitnessGoal: document.getElementById("prefGoal").value,
                injuries: document.getElementById("prefInjuries").value,
                medicalCondition: document.getElementById("prefMedical").value,
                profileCompleted: true
            };

            try {
                const response = await fetch(`http://localhost:5001/api/auth/profile/${user.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedData)
                });

                if (response.ok) {
                    alert("Preferences saved successfully!");
                    modal.classList.remove("active");
                    
                    // Reload profile & update recommendations
                    profile = await loadUserProfile(user.id);
                    if (profile) {
                        const welcomeEl = document.querySelector(".welcome");
                        if (welcomeEl) {
                            welcomeEl.textContent = `Namaste, ${profile.name} 👋`;
                        }
                        renderRecommendedPoses(profile.fitnessGoal);
                    }
                } else {
                    alert("Failed to save preferences.");
                }
            } catch (err) {
                console.error("Save error:", err);
                alert("An error occurred while saving.");
            }
        });
    }

    const sessions = await loadSessions(user.id);
    console.log("Mongo Sessions:", sessions);

    // Sessions
    const totalSessionsEl = document.getElementById("totalSessions");
    if (totalSessionsEl) totalSessionsEl.textContent = sessions.length;

    // Average Accuracy
    const avg =
        sessions.length
            ? Math.round(
                sessions.reduce((a, b) => a + b.accuracy, 0) /
                sessions.length
            )
            : 0;

    const avgAccuracyEl = document.getElementById("avgAccuracy");
    if (avgAccuracyEl) avgAccuracyEl.textContent = avg + "%";

    // Best Accuracy
    const best =
        sessions.length
            ? Math.max(...sessions.map(s => s.accuracy))
            : 0;

    const bestAccuracyEl = document.getElementById("bestAccuracy");
    if (bestAccuracyEl) bestAccuracyEl.textContent = best + "%";

    // Current Streak
    const streak = calculateCurrentStreak(sessions);
    const currentStreakEl = document.getElementById("currentStreak");
    if (currentStreakEl) {
        currentStreakEl.textContent = streak + " Day" + (streak === 1 ? "" : "s");
    }

    // Longest Streak
    const longestStreak = calculateLongestStreak(sessions);
    const longestStreakEl = document.querySelector(".stats .card:nth-child(2) h2");
    if (longestStreakEl) {
        longestStreakEl.textContent = longestStreak + " Day" + (longestStreak === 1 ? "" : "s");
    }

    // Heatmap
    generateHeatmap(sessions);
})();
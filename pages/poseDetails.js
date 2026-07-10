document.addEventListener("DOMContentLoaded", () => {
    // 1. Authenticate check
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    // 3. Load pose details
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    
    if (typeof yogaPoses === "undefined") {
        console.error("yogaPoses database not loaded.");
        return;
    }

    const pose = yogaPoses.find(p => p.id === id) || yogaPoses[0];

    const imgEl = document.getElementById("poseImage");
    if (imgEl) imgEl.src = pose.image;

    const nameEl = document.getElementById("poseName");
    if (nameEl) nameEl.innerHTML = pose.name;

    const sanskritEl = document.getElementById("poseSanskrit");
    if (sanskritEl) sanskritEl.innerHTML = pose.sanskrit;

    const ratingEl = document.getElementById("rating");
    if (ratingEl) ratingEl.innerHTML = "⭐ " + (pose.rating !== undefined ? pose.rating : "4.5");

    const levelEl = document.getElementById("level");
    if (levelEl) levelEl.innerHTML = "Level : " + pose.level;

    const durEl = document.getElementById("duration");
    if (durEl) durEl.innerHTML = "⏱ " + pose.duration;

    const calEl = document.getElementById("calories");
    if (calEl) calEl.innerHTML = "🔥 " + pose.calories;

    const descEl = document.getElementById("description");
    if (descEl) descEl.innerHTML = pose.description;

    // Populate Benefits
    const benefitsEl = document.getElementById("benefits");
    if (benefitsEl && pose.benefits) {
        benefitsEl.innerHTML = "";
        pose.benefits.forEach(item => {
            benefitsEl.innerHTML += `<li>${item}</li>`;
        });
    }

    // Populate Instructions
    const instructionsEl = document.getElementById("instructions");
    if (instructionsEl) {
        instructionsEl.innerHTML = "";
        const steps = pose.instructions || [
            "Start in Mountain Pose.",
            "Move into the posture slowly and hold.",
            "Breathe deeply and focus on your balance."
        ];
        steps.forEach(item => {
            instructionsEl.innerHTML += `<li>${item}</li>`;
        });
    }

    // Populate Mistakes
    const mistakesEl = document.getElementById("mistakes");
    if (mistakesEl) {
        mistakesEl.innerHTML = "";
        const errors = pose.mistakes || [
            "Holding your breath.",
            "Losing focus or alignment."
        ];
        errors.forEach(item => {
            mistakesEl.innerHTML += `<li>${item}</li>`;
        });
    }

    // Populate Muscles
    const musclesEl = document.getElementById("muscles");
    if (musclesEl) {
        musclesEl.innerHTML = "";
        const muscleGroups = pose.muscles || [
            "Core",
            "Glutes",
            "Shoulders"
        ];
        muscleGroups.forEach(item => {
            musclesEl.innerHTML += `<li>${item}</li>`;
        });
    }

    // 4. Practice button redirection
    const practiceBtn = document.getElementById("practiceBtn");
    if (practiceBtn) {
        practiceBtn.onclick = () => {
            window.location.href = `practice.html?id=${pose.id}`;
        };
    }
});
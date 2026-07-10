import { PoseDetector } from "./pose/poseDetector.js";

const video = document.getElementById("video");
const canvas = document.getElementById("outputCanvas");

const accuracy = document.getElementById("accuracy");
const feedback = document.getElementById("feedback");
const timer = document.getElementById("timer");

const poseName = document.getElementById("poseName");
const poseLevel = document.getElementById("poseLevel");
const poseSanskrit = document.getElementById("poseSanskrit");

const startBtn = document.getElementById("startBtn");
const finishBtn = document.getElementById("finishBtn");

const urlParams = new URLSearchParams(window.location.search);

const poseId = urlParams.get("id") || "warrior2";

// Check login status
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Load pose details dynamically
if (typeof yogaPoses !== "undefined") {
    const pose = yogaPoses.find(p => p.id === poseId);
    if (pose) {
        if (poseName) poseName.textContent = pose.name;
        if (poseSanskrit) poseSanskrit.textContent = pose.sanskrit;
        if (poseLevel) {
            poseLevel.textContent = pose.level;
        }
        const cueList = document.getElementById("cueList");
        if (cueList) {
            cueList.innerHTML = "";
            const cues = pose.instructions || pose.benefits || ["Keep your spine straight", "Engage your core", "Breathe normally"];
            cues.forEach(cue => {
                const li = document.createElement("li");
                li.textContent = cue;
                cueList.appendChild(li);
            });
        }
    }
}

const detector = new PoseDetector({

    videoEl: video,

    canvasEl: canvas,

    pose: {

        target: poseAngles[poseId],

        tolerance: 15

    },

    els: {

        statusEl: document.getElementById("liveStatus"),

        accuracyEl: accuracy,

        feedbackEl: feedback,
         elapsedEl: timer

    }

});
startBtn.addEventListener("click", async () => {

    startBtn.disabled = true;

    finishBtn.disabled = false;

    await detector.start();

});
finishBtn.addEventListener("click", async () => {

    await saveSession();

    detector.stop();

    startBtn.disabled = false;

    finishBtn.disabled = true;

});
window.updateJointCards = function(measured){

    Object.keys(measured).forEach(joint=>{

        const element = document.getElementById(joint);

        if(!element) return;

        element.textContent = measured[joint] + "°";

        if(measured[joint] >= 160){

            element.style.color = "#22c55e";

        }

        else if(measured[joint] >= 120){

            element.style.color = "#f59e0b";

        }

        else{

            element.style.color = "#ef4444";

        }

    });

}
window.updateAccuracy = function(score){

    const accuracy = document.getElementById("accuracy");

    const circle = document.getElementById("scoreCircle");

    accuracy.textContent = score + "%";

    circle.textContent = score + "%";

}

async function saveSession() {

    console.log("saveSession called");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please login first.");
        return;
    }

    // Convert timer (MM:SS) to total seconds
    const timeText = timer.textContent.trim();

    const parts = timeText.split(":");

    const duration =
        Number(parts[0]) * 60 +
        Number(parts[1]);

    const session = {

        user: user.id,

        pose: poseId,

        accuracy: Number(accuracy.textContent.replace("%", "")),

        duration: duration,

        calories: 8

    };

    console.log("Sending Session:", session);

    try {

        const response = await fetch("http://localhost:5001/api/practice", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(session)

        });

        console.log("Status:", response.status);

        const data = await response.json();

        console.log("Response:", data);

        if (response.ok) {

            alert("Practice saved successfully!");

        } else {

            alert(data.message);

        }

    }
    catch (err) {

        console.error("Save Error:", err);

        alert("Unable to save session.");

    }

}
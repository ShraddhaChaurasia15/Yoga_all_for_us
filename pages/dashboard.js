// ============================
// HEATMAP
// ============================

const heatmap = document.getElementById("heatmap");

if (heatmap) {

    for (let i = 0; i < 180; i++) {

        const box = document.createElement("div");
        box.classList.add("box");

        const random = Math.floor(Math.random() * 4);

        if (random === 1) box.classList.add("level1");
        if (random === 2) box.classList.add("level2");
        if (random === 3) box.classList.add("level3");

        heatmap.appendChild(box);
    }

}


// ============================
// RECOMMENDED POSES
// ============================

const recommendContainer = document.getElementById("recommendContainer");

if (recommendContainer && typeof yogaPoses !== "undefined") {

    const recommended = yogaPoses
        .filter(pose => pose.level === "Beginner")
        .slice(0, 6);

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

} else {

    console.error("yogaPoses not found or recommendContainer missing.");

}
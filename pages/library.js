const beginnerContainer =
document.getElementById("beginnerContainer");

const intermediateContainer =
document.getElementById("intermediateContainer");

const advancedContainer =
document.getElementById("advancedContainer");

const searchBox =
document.getElementById("searchBox");

const difficultyFilter =
document.getElementById("difficultyFilter");



function createCard(pose)
{

    return `

    <div class="pose-card">

        <div class="image-container">

    <img
    src="${pose.image}"
    alt="${pose.name}">

    <div class="overlay">

        <button
        class="practice-btn"
        onclick="startPractice('${pose.id}')">

            ▶ Practice

        </button>

    </div>

</div>

      <span class="badge ${pose.level.toLowerCase()}">

${pose.level}

</span>

        <div class="card-content">

            <h3>${pose.name}</h3>

            <h4>${pose.sanskrit}</h4>

            <div class="info">

                <span>⏱ ${pose.duration}</span>

                <span>🔥 ${pose.calories}</span>

            </div>

            <ul>

                <li>${pose.benefits[0]}</li>

                <li>${pose.benefits[1]}</li>

            </ul>

            <button
            onclick="openPose('${pose.id}')">

                View Details →

            </button>

        </div>

    </div>

    `;

}



function displayPoses(list)
{

    beginnerContainer.innerHTML = "";

    intermediateContainer.innerHTML = "";

    advancedContainer.innerHTML = "";



    list.forEach(pose=>{

        if(pose.level==="Beginner")
        {
            beginnerContainer.innerHTML +=
            createCard(pose);
        }

        else if(pose.level==="Intermediate")
        {
            intermediateContainer.innerHTML +=
            createCard(pose);
        }

        else
        {
            advancedContainer.innerHTML +=
            createCard(pose);
        }

    });

}



displayPoses(yogaPoses);



searchBox.addEventListener("keyup",()=>{

    const keyword =
    searchBox.value.toLowerCase();

    const filtered = yogaPoses.filter(pose=>{

        return pose.name.toLowerCase().includes(keyword)

        ||

        pose.sanskrit.toLowerCase().includes(keyword);

    });

    displayPoses(filtered);

});



difficultyFilter.addEventListener("change",()=>{

    const value =
    difficultyFilter.value;

    if(value==="All")
    {
        displayPoses(yogaPoses);
        return;
    }

    const filtered = yogaPoses.filter(pose=>{

        return pose.level===value;

    });

    displayPoses(filtered);

});



function openPose(id)
{

    window.location.href =
    `poseDetails.html?id=${id}`;

}
function scrollLeft(id){

    document.getElementById(id).scrollBy({

        left:-350,

        behavior:"smooth"

    });

}

function scrollRight(id){

    document.getElementById(id).scrollBy({

        left:350,

        behavior:"smooth"

    });

}
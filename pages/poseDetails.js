const params =
new URLSearchParams(
window.location.search
);

const id =
params.get("id");

const pose =
yogaPoses.find(

p=>p.id===id

);

document.getElementById(
"poseImage"
).src = pose.image;

document.getElementById(
"poseName"
).innerHTML = pose.name;

document.getElementById(
"poseSanskrit"
).innerHTML = pose.sanskrit;

document.getElementById(
"rating"
).innerHTML =
"⭐ "+pose.rating;

document.getElementById(
"level"
).innerHTML =
"Level : "+pose.level;

document.getElementById(
"duration"
).innerHTML =
"⏱ "+pose.duration;

document.getElementById(
"calories"
).innerHTML =
"🔥 "+pose.calories;

document.getElementById(
"description"
).innerHTML =
pose.description;

pose.benefits.forEach(item=>{

document.getElementById(
"benefits"
).innerHTML +=

`<li>${item}</li>`;

});

pose.instructions.forEach(item=>{

document.getElementById(
"instructions"
).innerHTML +=

`<li>${item}</li>`;

});

pose.mistakes.forEach(item=>{

document.getElementById(
"mistakes"
).innerHTML +=

`<li>${item}</li>`;

});

pose.muscles.forEach(item=>{

document.getElementById(
"muscles"
).innerHTML +=

`<li>${item}</li>`;

});
document
.getElementById("practiceBtn")
.onclick = () => {

window.location.href =
`pose.html?id=${pose.id}`;

};
const user =
JSON.parse(
localStorage.getItem("user")
);

document
.getElementById("profileForm")
.addEventListener(
"submit",

async (e)=>{

e.preventDefault();

const data = {

age:
document.getElementById("age").value,

gender:
document.getElementById("gender").value,

height:
document.getElementById("height").value,

weight:
document.getElementById("weight").value,

fitnessGoal:
document.getElementById("goal").value,

injuries:
document.getElementById("injuries").value,

medicalCondition:
document.getElementById("medicalCondition").value,

profileCompleted:true

};

const response =
await fetch(

`http://localhost:5001/api/auth/profile/${user.id}`,

{
method:"PUT",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(data)
}

);

if(response.ok){

alert(
"Profile Saved!"
);

window.location.href =
"dashboard.html";

}

});
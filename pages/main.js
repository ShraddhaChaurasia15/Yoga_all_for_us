// ScrollReveal Options
const scrollRevealOptions = {
    distance: "50px", // Distance elements will move during animation
    origin: "bottom", // Default animation origin
    duration: 1000,   // Animation duration in milliseconds
  };
  
  // Header Container Animations
  ScrollReveal().reveal(".header__container h1", {
    ...scrollRevealOptions,
    delay: 500,
  });
  
  ScrollReveal().reveal(".header__container h2", {
    ...scrollRevealOptions,
    delay: 1000,
  });
  
  ScrollReveal().reveal(".header__container .btn", {
    ...scrollRevealOptions,
    delay: 1500,
  });
  
  ScrollReveal().reveal(".header__container img", {
    ...scrollRevealOptions,
    origin: "right", // Changing origin for image
  });
  
  // Why Section Animations
  ScrollReveal().reveal(".why__container .section__header", {
    ...scrollRevealOptions,
    delay: 500,
  });
  
  ScrollReveal().reveal(".why__container p", {
    ...scrollRevealOptions,
    delay: 1000,
  });
  
  ScrollReveal().reveal(".why__container li", {
    ...scrollRevealOptions,
    delay: 1500,
    interval: 500, // Staggered animation for list items
  });
  
  ScrollReveal().reveal(".why__container img", {
    ...scrollRevealOptions,
    origin: "left", // Changing origin for image
  });
  
  // Hero Section Animations
  ScrollReveal().reveal(".hero__card", {
    ...scrollRevealOptions,
    interval: 500, // Staggered animation for cards
  });
  
  // Classes Section Animations
  ScrollReveal().reveal(".classes__image", {
    ...scrollRevealOptions,
    interval: 500,
    origin: "bottom",
  });
  
  // Membership Section Animations
  ScrollReveal().reveal(".membership__card", {
    ...scrollRevealOptions,
    interval: 500, // Staggered animation for cards
  });
  
  // Stories Section Animations
  ScrollReveal().reveal(".stories__card", {
    ...scrollRevealOptions,
    interval: 500,
  });
  
  // Posts Section Animations
  ScrollReveal().reveal(".posts__card", {
    ...scrollRevealOptions,
    interval: 500,
  });
  
  // Photos Section Animations
  ScrollReveal().reveal(".photos__card", {
    ...scrollRevealOptions,
    duration: 1000, // Longer duration for photos
    interval: 500,  // Staggered animation for cards
  });
  
  // Footer Section Animations (optional, if needed)
  ScrollReveal().reveal(".footer__links, .footer__info", {
    ...scrollRevealOptions,
    interval: 300,
  });

  // Navigate to signup page when the "Sign Up" button is clicked
document.querySelector('.signup-btn a')?.addEventListener('click', function (e) {
    window.location.href = 'signup.html';
  });
  
  // Navigate to signup page from the login page's "Register" link
  document.querySelector('a[href="signup.html"]')?.addEventListener('click', function (e) {
    window.location.href = 'signup.html';
  });
  
  // main.js (Frontend)

document.addEventListener("DOMContentLoaded", () => {
  // Handle form submission (sign-up)
  const signupForm = document.querySelector('.signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent the default form submission

      // Get form data
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      try {
        // Send POST request to backend to create user
        const response = await fetch('http://localhost:5001/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }), // Send data to backend
        });

        const data = await response.json();
        if (response.ok) {
          // Handle successful response
          alert('User created successfully!');
          window.location.href = 'login.html'; // Redirect to login page (optional)
        } else {
          // Handle error response
          alert(data.msg || 'Error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Network error');
      }
    });
  }
});
const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chat-container");

chatToggle.addEventListener("click", () => {
    if (chatContainer.style.display === "flex") {
        chatContainer.style.display = "none";
    } else {
        chatContainer.style.display = "flex";
    }
});

function sendMessage() {

    const input = document.getElementById("user-input");

    const message = input.value.trim();

    if (!message) return;

    const messages = document.getElementById("chat-messages");

    messages.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    let reply = getYogaReply(message);

    messages.innerHTML += `
        <div class="bot-message">
            ${reply}
        </div>
    `;

    input.value = "";

    messages.scrollTop = messages.scrollHeight;
}

function getYogaReply(message) {

    message = message.toLowerCase();

    if(message.includes("back pain"))
        return "Try Cobra Pose, Child Pose and Cat-Cow Stretch.";

    if(message.includes("weight loss"))
        return "Practice Surya Namaskar, Warrior Pose and Plank Pose.";

    if(message.includes("stress"))
        return "Meditation, Sukhasana and Deep Breathing can help.";

    if(message.includes("sleep"))
        return "Try Legs-Up-The-Wall Pose and Corpse Pose before bed.";

    return "I can help with yoga routines, flexibility, stress relief and fitness goals.";
}
function startVoice() {

    const recognition =
        new(window.SpeechRecognition ||
            window.webkitSpeechRecognition)();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function(event) {

        const speechText =
            event.results[0][0].transcript;

        document.getElementById("user-input").value =
            speechText;

        sendMessage();
    };
}
function generatePlan(){

    const goal =
        document.getElementById("goalSelect").value;

    const result =
        document.getElementById("planResult");

    if(goal==="weightloss"){

        result.innerHTML = `
        <h3>Weight Loss Plan</h3>
        🧘 Surya Namaskar - 10 mins<br>
        🧘 Warrior Pose - 5 mins<br>
        🧘 Plank Pose - 3 mins<br>
        🧘 Boat Pose - 5 mins
        `;
    }

    else if(goal==="stress"){

        result.innerHTML = `
        <h3>Stress Relief Plan</h3>
        🌿 Child Pose - 5 mins<br>
        🌿 Sukhasana - 10 mins<br>
        🌿 Deep Breathing - 5 mins<br>
        🌿 Shavasana - 10 mins
        `;
    }

    else if(goal==="sleep"){

        result.innerHTML = `
        <h3>Better Sleep Plan</h3>
        😴 Legs Up Wall - 5 mins<br>
        😴 Butterfly Pose - 5 mins<br>
        😴 Deep Breathing - 10 mins
        `;
    }

    else if(goal==="flexibility"){

        result.innerHTML = `
        <h3>Flexibility Plan</h3>
        🤸 Downward Dog - 5 mins<br>
        🤸 Cobra Pose - 5 mins<br>
        🤸 Triangle Pose - 5 mins<br>
        🤸 Forward Bend - 5 mins
        `;
    }

    else{

        result.innerHTML =
        "Please select a goal.";
    }
}
function calculateBMI(){

    const height =
        document.getElementById("height").value / 100;

    const weight =
        document.getElementById("weight").value;

    if(!height || !weight){
        alert("Please enter height and weight");
        return;
    }

    const bmi =
        (weight / (height * height)).toFixed(1);

    let category = "";
    let recommendation = "";

    if(bmi < 18.5){
        category = "Underweight";
        recommendation =
        "Focus on strength-building yoga and balanced nutrition.";
    }
    else if(bmi < 25){
        category = "Normal";
        recommendation =
        "Maintain your fitness with regular yoga practice.";
    }
    else if(bmi < 30){
        category = "Overweight";
        recommendation =
        "Try weight-loss yoga routines and cardio exercises.";
    }
    else{
        category = "Obese";
        recommendation =
        "Start with beginner yoga and daily walking.";
    }

    document.getElementById("bmiResult").innerHTML =
    `
    BMI: ${bmi}<br>
    Category: ${category}<br><br>
    💡 ${recommendation}
    `;
}
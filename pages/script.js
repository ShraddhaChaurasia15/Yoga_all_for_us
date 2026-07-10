// Toggle Password Visibility
document.getElementById('togglePassword')?.addEventListener('click', function () {
  const passwordField = document.getElementById('password');
  if (passwordField) {
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
  }
});

// Handle Login Form Submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    // Get the values from the form inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Send a POST request to the login API
      const response = await fetch('http://localhost:5001/api/auth/login',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

     if(response.ok){

    localStorage.setItem(

        "token",

        data.token

    );
    

    localStorage.setItem(

        "user",

        JSON.stringify(data.user)

    );

    alert("Welcome to Yoga : All For Us 🌿");

    window.location.href="library.html";

}else {
        // Handle login error
        alert(data.msg || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  });
}

// Handle Signup Form Submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    // Get the values from the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Send a POST request to the signup API
      const response = await fetch('http://localhost:5001/api/auth/signup',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {

    localStorage.setItem("token", data.token);

    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Welcome to Yoga : All For Us 🌿");

    window.location.href = "library.html";

} else {
        // Handle signup errors
        alert(data.msg || 'Signup failed. Please try again.');
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  });
}
const chatToggle = document.getElementById("chat-toggle");

if(chatToggle){

    chatToggle.addEventListener("click", () => {

        const chatContainer =
            document.getElementById("chat-container");

        if(chatContainer.style.display === "flex"){
            chatContainer.style.display = "none";
        }else{
            chatContainer.style.display = "flex";
        }

    });
}

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

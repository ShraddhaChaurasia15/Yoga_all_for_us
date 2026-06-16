# Yoga All For Us

## About the Project

Yoga All For Us is a web-based yoga platform designed to help users maintain a healthy lifestyle through yoga. Users can create an account, log in, explore yoga exercises, and track their progress through a personalized dashboard.

The aim of this project is to provide a simple and interactive platform where users can build a consistent yoga routine based on their fitness goals.

---

## Features

### User Authentication

- User registration and login
- Secure password storage using bcrypt
- Authentication using JWT

### User Dashboard

After logging in, users can access their dashboard and view:

- Personal information
- Weekly activity
- Yoga routine suggestions
- Activity calendar

### Personalized Profile

Users can provide information such as:

- Age
- Gender
- Height
- Weight
- Fitness goals
- Medical conditions
- Injuries

This information can be used to recommend suitable yoga routines.

### Yoga Library

A collection of yoga poses and exercises that users can browse and learn from.

### Streak Tracking (In Progress)

The platform is being extended with a streak tracking system similar to platforms like LeetCode and Duolingo.

Users will be able to:

- Mark daily yoga completion
- Maintain activity streaks
- Earn badges for consistency
- Track progress over time

### Pose Detection (Planned)

A future enhancement of the project is real-time pose detection using computer vision.

The system will:

- Detect user body posture through webcam
- Compare posture with expected yoga poses
- Provide feedback and corrections
- Help users perform exercises more accurately

---

## Technologies Used

### Frontend

- HTML
- CSS
- JavaScript
- Chart.js

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JWT
- bcrypt

### Version Control

- Git
- GitHub

---

## Project Structure

```text
Yoga_all_for_us
│
├── assets
├── web-auth-backend
│   ├── models
│   ├── routes
│   ├── server.js
│   └── db.js
│
├── index.html
├── login.html
├── signup.html
├── dashboard.html
├── profile.html
│
├── styles.css
├── dashboard.css
├── script.js
├── dashboard.js
└── profile.js
```

---

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/ShraddhaChaurasia15/Yoga_all_for_us.git
```

### Install Dependencies

```bash
cd web-auth-backend
npm install
```

### Create a .env File

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

### Start the Backend Server

```bash
node server.js
```

### Run the Frontend

Open `index.html` using Live Server in VS Code.

---

## Future Improvements

Some features planned for future development:

- Personalized yoga recommendations
- Streak and badge system
- Real-time pose detection
- AI yoga assistant
- Mobile-friendly improvements
- Progress analytics

---

## Author

Shraddha Chaurasia

GitHub: https://github.com/ShraddhaChaurasia15

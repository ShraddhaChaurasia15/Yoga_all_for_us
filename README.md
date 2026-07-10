# Yoga: All For Us

A full-stack, responsive web application for personalized yoga practice, tracking, and pose analysis.

## Core Features
* **Pose Library:** Comprehensive directory of yoga poses sorted by difficulty (Beginner, Intermediate, Advanced) with full instructions, target muscles, and tips.
* **AI Practice:** Real-time webcam joint angle detection using Computer Vision (MediaPipe) to track posture and calculate pose accuracy score.
* **Interactive Dashboard:** Complete metrics analytics detailing streaks, total sessions, average accuracy, and a 180-day interactive consistency heatmap.
* **Resilient Architecture:** Dual database handlers (MongoDB Atlas with automatic fallback to local JSON database) to keep the app working 100% offline.

## Tech Stack
* **Frontend:** Vanilla HTML5, CSS3, JavaScript, MediaPipe, Chart.js
* **Backend:** Node.js, Express, JWT, Bcrypt
* **Database:** MongoDB Atlas, Mongoose, Local JSON Fallback

## Running the Project
1. **Configure Environment:** Create a `.env` file in `/web-auth-backend`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5001
   ```
2. **Start Backend:**
   ```bash
   cd web-auth-backend
   npm install
   node app.js
   ```
3. **Open Frontend:** Open `pages/index.html` in your browser.

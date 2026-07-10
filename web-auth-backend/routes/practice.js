const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const PracticeSession = require("../models/PracticeSession");
const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, '..', 'db_fallback.json');

const readJSONDb = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], sessions: [] }, null, 2));
  }
  try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (!data.sessions) data.sessions = [];
    if (!data.users) data.users = [];
    return data;
  } catch (e) {
    return { users: [], sessions: [] };
  }
};

const writeJSONDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// ==========================
// Save Practice Session
// ==========================
router.post("/", async (req, res) => {

    try {

        console.log("Incoming Request Body:");
        console.log(req.body);

        const {
            user,
            pose,
            practice,
            accuracy,
            duration,
            calories
        } = req.body;

        const poseValue = pose || practice;

        // Validate required fields
        console.log("Received Body:", req.body);

if (!user) {
    return res.status(400).json({ success: false, message: "User missing" });
}

if (!poseValue) {
    return res.status(400).json({ success: false, message: "Pose missing" });
}

if (accuracy === undefined || Number.isNaN(accuracy)) {
    return res.status(400).json({
        success: false,
        message: "Accuracy invalid",
        value: accuracy
    });
}

if (duration === undefined || Number.isNaN(duration)) {
    return res.status(400).json({
        success: false,
        message: "Duration invalid",
        value: duration
    });
}

        if (global.dbType === 'json') {
            const db = readJSONDb();
            const session = {
                _id: Math.random().toString(36).substr(2, 9),
                user,
                pose: poseValue,
                accuracy: Number(accuracy),
                duration: Number(duration),
                calories: Number(calories) || 0,
                practicedAt: new Date()
            };
            db.sessions.push(session);
            writeJSONDb(db);

            console.log("Practice Saved Successfully to local JSON DB");
            return res.status(201).json({
                success: true,
                message: "Practice session saved successfully",
                session
            });
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({
                success: false,
                message: "Invalid User ID"
            });
        }

        const session = new PracticeSession({

            user,
            pose: poseValue,
            accuracy: Number(accuracy),
            duration: Number(duration),
            calories: Number(calories) || 0

        });

        await session.save();

        console.log("Practice Saved Successfully");

        res.status(201).json({

            success: true,
            message: "Practice session saved successfully",

            session

        });

    }
    catch (err) {

        console.error("========== Practice Route Error ==========");
        console.error(err);
        console.error("Validation Errors:", err.errors);
        console.error("==========================================");

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

});

// ==========================
// Get User Sessions
// ==========================
router.get("/:userId", async (req, res) => {

    try {

        if (global.dbType === 'json') {
            const db = readJSONDb();
            const userSessions = db.sessions
                .filter(s => s.user === req.params.userId)
                .sort((a, b) => new Date(b.practicedAt) - new Date(a.practicedAt));

            return res.json({
                success: true,
                sessions: userSessions
            });
        }

        const sessions = await PracticeSession.find({

            user: req.params.userId

        }).sort({

            practicedAt: -1

        });

        res.json({

            success: true,

            sessions

        });

    }
    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

module.exports = router;
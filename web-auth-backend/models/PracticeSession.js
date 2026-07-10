const mongoose = require("mongoose");

const practiceSessionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    pose: {
        type: String,
        required: true
    },

    accuracy: {
        type: Number,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    calories: {
        type: Number,
        default: 0
    },

    practicedAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "PracticeSession",
    practiceSessionSchema
);
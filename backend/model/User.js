// 

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emails: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    verified: {
        type: Boolean,
        default: false,
    },
    // 🚀 Yeh dono fields explicitly added hain
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    }
}, { 
    timestamps: true,
    strict: false // 🔥 EXTRA SAFETY: Yeh mongoose ko force karega ki koi bhi dynamic field drop na kare!
});

module.exports = mongoose.model("User", userSchema);
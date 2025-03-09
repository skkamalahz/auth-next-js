import mongoose from "mongoose";
import { use } from "react";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        //match: [/.+\@.+\..+/, "Please use a valid email address."]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        //minlength: [6, "Password must be at least 6 characters long"]
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
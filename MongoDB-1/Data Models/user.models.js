import mongoose, { Schema } from "mongoose";

// type
// required
// default
// enum
// trim
// lowercase
// minlength
// maxlength
// match
// unique
// index
// select
// ref

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        match: [/^[A-Za-z0-9_]+$/, "Username can only contain letters, numbers, and underscores"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        password: [true, "Password is required"],
        select: false,
        minlength: 5
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)
const mongoose = require("mongoose");
const userMethods = require("./user.methods");

const Schema = mongoose.Schema;

const User = new Schema(
    {
        fname: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 100,
        },
        lname: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minLength: 5,
            maxLength: 100,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        token: {
            type: String,
            select: false,
        },
    },
    { timestamps: true, versionKey: false }
);

userMethods(User);

module.exports = mongoose.model("User", User);

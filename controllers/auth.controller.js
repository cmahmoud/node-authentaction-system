const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user.model");
const Schema = require("../lib/schema");
const validate = require("../middlewares/validate");

module.exports.register = [
    validate(Schema.register),
    async (req, res) => {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "email in use..." });
        }
        const salt = await bcrypt.genSalt(16);
        const hashed = await bcrypt.hash(req.body.password, salt);
        user = new User({ ...req.body, password: hashed });
        await user.save();
        res.status(200).json({ message: "Account created" });
    },
];
module.exports.login = [
    validate(Schema.login),
    async (req, res) => {
        const user = await User.findOne({ email: req.body.email }).select(
            "+password"
        );
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return res.status(400).json({ message: "Wrong password" });
        }
        const token = await user.generateToken();
        return res.status(200).json({ token });
    },
];
module.exports.resetPassword = [
    validate(Schema.email),
    async (req, res) => {
        let user = await User.findOne({ email: req.body.email }).select(
            "+token"
        );
        if (!user) {
            return res.status(400).json({ message: "invalid email" });
        }
        user.token = crypto.randomBytes(16).toString("hex");
        await user.save();
        const emailBody = `click here to reset password http://localhost:5000/api/auth/password/reset/${user.token}`;
        return res.status(200).send(emailBody);
    },
];
module.exports.updatePassword = [
    validate(Schema.password),
    async (req, res) => {
        let user = await User.findOne({ token: req.params.token }).select(
            "+password +token"
        );
        if (!user) {
            return res.status(400).json({ message: "invalid token" });
        }
        const salt = await bcrypt.genSalt(16);
        const hashed = await bcrypt.hash(req.body.password, salt);
        user.password = hashed;
        user.token = "";
        await user.save();
        return res.status(200).json({ message: "password changed" });
    },
];

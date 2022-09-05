const jwt = require("jsonwebtoken");

module.exports = (schema) => {
    schema.methods.generateToken = function () {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
    };
};

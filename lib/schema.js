const Joi = require("joi");

module.exports.login = Joi.object({
    email: Joi.string().email().required().min(5),
    password: Joi.string().min(8).max(100).required(),
});
module.exports.register = Joi.object({
    fname: Joi.string().min(2).max(30).required(),
    lname: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(8).max(100).required(),
});
module.exports.email = Joi.object({
    email: Joi.string().email().min(5).required(),
});
module.exports.password = Joi.object({
    password: Joi.string().min(8).max(100).required(),
});

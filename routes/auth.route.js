const router = require("express").Router();
const Controller = require("../controllers/auth.controller");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/password/reset", Controller.resetPassword);
router.post("/password/reset/:token", Controller.updatePassword);

module.exports = router;

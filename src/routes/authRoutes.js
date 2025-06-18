const authController = require("@controller/auth");
const router = require("express").Router();


router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);


module.exports = router;

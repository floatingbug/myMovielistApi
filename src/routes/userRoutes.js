const router = require("express").Router();
const userController = require("@controller/user");


router.get("/get-user", userController.getUser);


module.exports = router;

const express = require("express");
const { UserLogin, UserRegister } = require("../controllers/UserController");

const router = express.Router();

router.post("/register", UserRegister);

router.post("/login", UserLogin);

module.exports = router;

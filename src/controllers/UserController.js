const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/Users");

const UserLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Username or Password is incorrect.",
    });
    return;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.json({ message: "Username or Password is incorrect." });
  }

  const token = jwt.sign({ id: user._id }, "secret-key");
  res.status(200).json({
    success: true,
    token,
    user: user,
  });
};

const UserRegister = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "Username already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({
      message: "User Created Successfully.",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  UserLogin,
  UserRegister,
};

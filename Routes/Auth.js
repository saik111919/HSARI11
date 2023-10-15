const express = require("express");
// const {} = require("../Pages/Verify");
const { httpStatusCodes } = require("../Pages/Status");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../Pages/Modal");
const role = "user"; // Default role
const saltRounds = 10; // You can adjust the number of salt rounds as needed

// routes.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const {} = verifyRegister(req.body, res);

//     // Hash and salt the password
//     const saltRounds = 10; // You can adjust the number of salt rounds as needed
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     let role = "user";
//     let newUserId = 1;
//     const lastUser = await User.findOne({}, {}, { sort: { _id: -1 } });

//     if (lastUser) {
//       newUserId = lastUser._id + 1;
//     }

//     const newUser = new User({
//       _id: newUserId,
//       name: username,
//       email: email,
//       password: hashedPassword,
//       role: role,
//     });

//     const savedUser = await newUser.save();

//     res.status(httpStatusCodes.OK).send({
//       user: savedUser.name,
//       message: `${username} Registered Successfully.`,
//       status: httpStatusCodes.OK,
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: err.message,
//     });
//   }
// });

routes.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: "username and email fields or required",
        status: httpStatusCodes.BAD_REQUEST,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ name: username }, { email }],
    });

    if (existingUser) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ message: `${existingUser.name} User already exists` });
    }

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUserId = 1;
    const lastUser = await User.findOne({}, {}, { sort: { _id: -1 } });

    if (lastUser) {
      newUserId = lastUser._id + 1;
    }

    const newUser = new User({
      _id: newUserId,
      name: username,
      email: email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    res.status(httpStatusCodes.OK).send({
      user: savedUser.name,
      message: `${username} Registered Successfully.`,
      status: httpStatusCodes.OK,
    });
  } catch (err) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
});

module.exports = routes;

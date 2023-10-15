const express = require("express");
const { httpStatusCodes } = require("./Status");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const util = require("util");
const { User } = require("./Modal");

// const verifyRegister = async (data, res) => {
//   if (!data.username || !data.email || !data.password) {
//     return res.status(httpStatusCodes.BAD_REQUEST).json({
//       message: "username and email fields or required",
//       status: httpStatusCodes.BAD_REQUEST,
//     });
//   }
//   const existingUser = await User.findOne({
//     $or: [{ name: data.username }, { email: data.email }],
//   });

//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ message: `${existingUser.name} User already exists` });
//   }

//   if (data.email === "admin@gmail.com" || data.role) {
//     role = "admin";
//   }
// };

const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // if (decoded.role !== "admin") {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    req.user = decoded;

    // console.log(decoded);
    next();
  });
};

async function verifyUser(username, password) {
  const existingUser = await User.findOne({ name: username });
  const UserRole = await User.findOne({}, "role");
  if (!existingUser || !bcrypt.compare(password, existingUser.password)) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    role: existingUser.role,
    id: existingUser.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return { token, payload, UserRole };
}

module.exports = { verifyRegister, verifyToken };

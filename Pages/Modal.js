const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  password: String,
  role: String,
});
const User = mongoose.model("User", userSchema);

module.exports = { User };

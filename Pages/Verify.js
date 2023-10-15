const express = require("express");
const { httpStatusCodes } = require("./Status");

const verifyRegister = (data, res) => {
  if (!data.username || !data.password || !data.email) {
    res.status(httpStatusCodes.BAD_REQUEST).send({
      mesage: "Invalid username, email or password",
      status: httpStatusCodes.BAD_REQUEST,
    });
  }
};

module.exports = { verifyRegister };

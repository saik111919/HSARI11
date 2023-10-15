const express = require("express");
const { verifyRegister } = require("../Pages/Verify");
const { httpStatusCodes } = require("../Pages/Status");
const routes = express.Router();

routes.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  verifyRegister(req.body, res);

  res.status(httpStatusCodes.OK).send({
    message: `Registered Successfully ${username} ${email}`,
    status: httpStatusCodes.OK,
  });
});

module.exports = routes;

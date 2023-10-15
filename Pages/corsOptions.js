const express = require("express");
let corsOptions = {
  origin: "localhost, *, https://m6lms7nw-4000.asse.devtunnels.ms/",
  // origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
exports.corsOptions = corsOptions;

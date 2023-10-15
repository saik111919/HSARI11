const express = require("express");
const routes = require("./Routes/Auth");
const cors = require("cors");
const { corsOptions } = require("./Pages/corsOptions");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { getClientAndCollection } = require("./Pages/DB");
dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());

// DATABASE
getClientAndCollection();

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Optionally, you can also handle the "disconnected" event
db.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  });
});
app.use("/api", routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

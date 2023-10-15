const express = require("express");
const routes = require("./Routes/Auth");
const cors = require("cors");
const { corsOptions } = require("./Pages/corsOptions");
const app = express();
const port = 4000;

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

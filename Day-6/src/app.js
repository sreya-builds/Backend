/* server create karna */
/* server config karna*/

const express = require("express");

const app = express();

// middleware
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

module.exports = app;

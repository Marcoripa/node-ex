const express = require("express");
const cors = require("cors");

const app = express();

// CORS
const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use(express.json());

//Import user routes
const usersRoutes = require("./routes/users")

app.use("/users", usersRoutes);

module.exports = app;

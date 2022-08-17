const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");

const app = express();

// CORS
const corsOptions = {
  origin: "http://localhost:8080",
  credential: true
};

app.use(cors(corsOptions));

app.use(express.json());

//Import Passport 
const {passport} = require('./middleware/passport')
const session = require("express-session");

app.use(session({
  secret: 'keyboard',
  resave: false,
  saveUninitialized: false,
  cookie: {httpOnly: true, secure: false}
}))

app.use(passport.initialize());
app.use(passport.session())

//Import user routes
const usersRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")

app.use("/users", usersRoutes);
app.use("/", authRoutes)

//Homepage route
app.get("/", (req, res) => {
  res.sendFile("/Users/marco/node-ex/web/login.html");
})


module.exports = app;

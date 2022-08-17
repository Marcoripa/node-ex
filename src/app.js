const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
// const {validate} = require("./validation/index")
const multer = require("multer");

const app = express();

const prisma = new PrismaClient();

// CORS
const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use(express.json());

//UPLOAD FILES
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
});

const upload = multer({storage: storage});

//POST IMAGE
app.post("/upload", upload.single("image"), (req, res) => {
  res.send("Image uploaded")
})


//ROUTES
//GET
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

//GET :id
app.get("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id: userId } });

  res.json(user);
});

//POST
app.post("/users", async (req, res) => {
  const newUser = req.body;

  await prisma.user.create({ data: newUser });

  res.status(201).json(newUser);
});

//UPDATE
app.put("/users/:id", async (req, res) => {
  const updateUser = req.body;
  const userId = Number(req.params.id);
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name: req.body.name,
      description: req.body.description,
      age: req.body.age,
    },
  });

  res.json(user);
});

//DELETE
app.delete("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const user = await prisma.user.delete({ where: { id: userId } });

  res.json(user);
});


module.exports = app;

const express = require("express");
const { PrismaClient } = require("@prisma/client");
// const {validate} = require("./validation/index")

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

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

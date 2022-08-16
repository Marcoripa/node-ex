const express = require("express");
const {PrismaClient} = require("@prisma/client");
// const {validate} = require("./validation/index")

const prisma = new PrismaClient()

const app = express();

app.use(express.json())

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany()
  
  res.json(users)
});

app.post("/users", async (req, res) => {
  const newUser = req.body

  await prisma.user.create({data: newUser})

  res.status(201).json(newUser)
})

module.exports = app
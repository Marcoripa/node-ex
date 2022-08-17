const express = require('express')

//Import multer upload
const upload = require("../middleware/multer");

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

//Import Router
const { Router } = require("express");
const router = Router()

//GET
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

//GET :id
router.get("/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id: userId } });

  res.json(user);
});

//POST
router.post("/", async (req, res) => {
  const newUser = req.body;

  await prisma.user.create({ data: newUser });

  res.status(201).json(newUser);
});

//UPDATE
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const user = await prisma.user.delete({ where: { id: userId } });

  res.json(user);
});

//POST IMAGE
router.post("/:id/image", upload.single("image"), (req, res) => {
  res.send("Image uploaded");
});

module.exports = router
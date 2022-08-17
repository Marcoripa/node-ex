const express = require('express')

//Import multer upload
const upload = require("../middleware/multer");

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

//Import Router
const { Router } = require("express");
const router = Router()

//Import Passport authorization
const {checkAuthorization} = require("../middleware/passport")


//ROUTES
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
router.post("/", checkAuthorization, async (req, res) => {
  const newUser = {
    name: req.body.name,
    description: req.body.description,
    age: +req.body.age,
  };
  console.log(newUser);
  await prisma.user.create({ data: newUser });

  res.status(201).json(newUser);
});

//UPDATE
router.put("/:id", checkAuthorization, async (req, res) => {
  const updateUser = req.body;
  const userId = Number(req.params.id);
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name: req.body.name,
      description: req.body.description,
      age: +req.body.age,
    },
  });

  res.json(user);
});

//DELETE
router.delete("/:id", checkAuthorization, async (req, res) => {
  const userId = Number(req.params.id);
  const user = await prisma.user.delete({ where: { id: userId } });

  res.json(user);
});

//POST IMAGE
router.post(
  "/image",
   upload.single("image"),
  (req, res) => {
    res.send("Image uploaded");
  }
);

module.exports = router
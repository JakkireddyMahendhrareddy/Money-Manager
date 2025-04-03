const express = require("express");
// Update the path to the correct location of userController.js
const { getUsers, createUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;

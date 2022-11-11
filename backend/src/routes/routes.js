const { createUser, getUsers, getUserById, updateUser, deleteUser, login } = require("../controllers/authController.js");

const express = require('express');
const router = express.Router(); 
const { checkToken } = require ('../auth/tokenValidation.js');

router.post("/users", createUser);
router.get("/users", checkToken, getUsers);
router.get("/users/:id", checkToken, getUserById);
router.put("/users/:id", checkToken, updateUser);
router.delete("/users/:id", checkToken, deleteUser);
router.post("/users/login", login);

module.exports = router;
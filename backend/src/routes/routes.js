const { createUser, getUsers, getUserById, updateUser, deleteUser, login } = require("../controllers/authController.js");

const express = require('express');
const router = express.Router(); 
const { checkToken } = require ('../auth/tokenValidation.js');
const postController = require("../controllers/postController.js")


router.get("/postagens", postController.getPost);
router.get("/postagens/:id", postController.getPostById);
router.post("/postagens", postController.insertPost);
router.put("/postagens:id", postController.updatePost);
router.delete("/postagens:id", postController.deletePost);

router.post("/users", createUser);
router.get("/users", checkToken, getUsers);
router.get("/users/:id", checkToken, getUserById);
router.put("/users/:id", checkToken, updateUser);
router.delete("/users/:id", checkToken, deleteUser);
router.post("/users/login", login);

module.exports = router;
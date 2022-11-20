const { createUser, getUsers, getUserById, updateUser, deleteUser, login } = require("../controllers/authController.js");
const { uploadAvatar } = require("../controllers/avatarController.js")

const express = require('express');
const router = express.Router(); 
const { checkToken } = require ('../auth/tokenValidation.js');
const postController = require("../controllers/postController.js")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/assets/avatar')
        console.log(file)
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.originalname}-${Date.now()}.${ext}`);
        console.log(file)
    }
});

const upload = multer({ storage: storage });

router.post('/users/:id/avatar', upload.single('avatar'), uploadAvatar);

router.get("/postagens", postController.getPost);
router.get("/postagens/:id", postController.getPostById);
router.post("/postagens", postController.insertPost);
router.put("/postagens/:id", postController.updatePost);
router.delete("/postagens/:id", postController.deletePost);

router.post("/users", createUser);
router.get("/users", checkToken, getUsers);
router.get("/users/:id", checkToken, getUserById);
router.put("/users/:id", checkToken, updateUser);
router.delete("/users/:id", checkToken, deleteUser);
router.post("/users/login", login);

module.exports = router;
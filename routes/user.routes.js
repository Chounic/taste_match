const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
// const uploadController = require('../controllers/upload.controller');
// import multer from 'multer';
// const upload = multer();

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user display
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/followUser/:id", userController.followUser);
router.patch("/unfollowUser/:id", userController.unfollowUser);

// upload
// router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;
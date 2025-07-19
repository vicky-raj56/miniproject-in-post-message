import express from "express";
import {
  deletePostController,
  editProfilePostController,
  getAllPostSeeController,
  getEditProfilePostController,
  getProfileController,
  loginController,
  logutController,
  profileController,
  profileLikesController,
  profilePicController,
  registerController,
} from "../controllers/user.js";
import isLogedIn from "../middlewares/isLogin.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);
router.get("/logout", logutController);

router.get("/profile", isLogedIn, getProfileController);
router.post("/profile", isLogedIn, profileController);
router.get("/likes/:id", isLogedIn, profileLikesController);
router.get("/edit/:id", isLogedIn, getEditProfilePostController);
router.post("/update/:id", isLogedIn, editProfilePostController);
router.post("/upload", isLogedIn, upload.single("image"), profilePicController);
router.get("/user-post", isLogedIn, getAllPostSeeController);
router.post("/delete/:id",isLogedIn,deletePostController)
// frotned acces
router.post("/me", isLogedIn, (req, res) => {
  res.status(200).json({ success: true, message: "success to me" });
});

export default router;

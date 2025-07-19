import userModel from "../models/user.model.js";
import postModel from "../models/post.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  const { name, username, email, password, age } = req.body;
  if (!name || !username || !email || !password || !age) {
    return res
      .status(400)
      .json({ Success: false, message: "All fields are required" });
  }
  try {
    const exstingUser = await userModel.findOne({ email });
    if (exstingUser) {
      return res
        .status(400)
        .json({ success: false, message: "user already register" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      username,
      email,
      age,
      password: hashPassword,
    });
    const newuser = await user.save();

    const token = jwt.sign({ email, username }, "shhh", { expiresIn: "1h" });
    res.cookie("token", token, token, {
      httpOnly: true,
      sameSite: "Lax", // or "None" if using HTTPS
      secure: false,
      maxAge: 60 * 60 * 1000, // true if using HTTPS
    });
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: newuser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// login get route

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or passwpord" });
    }
    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isMatchPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Inavlid email or password" });
    }
    const token = jwt.sign(
      { email: existingUser.email, userId: existingUser._id },
      "shhh",
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, token, {
      httpOnly: true,
      sameSite: "Lax", // or "None" if using HTTPS
      secure: false,
      maxAge: 60 * 60 * 1000, //1hr       // true if using HTTPS
    });
    // res.redirect("/profile");
    res
      .status(200)
      .json({ success: true, message: "login successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// logout to redirect login and clear cookie
const logutController = async (req, res) => {
  const token = await req.cookies.token;
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "logout successfully" });
};

// get profile page
const getProfileController = async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");

  // console.log(user.posts)
  // res.render("profile", { user });
  res.status(200).json({ success: true, message: "data fatched", user });
};

const profileController = async (req, res) => {
  try {
    const { content } = req.body;
    console.log(content);
    const exstinguser = await userModel.findOne({ email: req.user.email });
    const creatUser = new postModel({
      user: exstinguser._id,
      content,
    });
    const newUser = await creatUser.save();

    exstinguser.posts.push(newUser._id);
    await exstinguser.save();

    res.status(200).json({ success: true, message: "post craeted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const profileLikesController = async (req, res) => {
  try {
    const post = await postModel
      .findOne({ _id: req.params.id })
      .populate("user");

    let message = ""; // 🔄 dynamic message

    if (post.likes.indexOf(req.user.userId) === -1) {
      post.likes.push(req.user.userId);
      message = "You liked the post"; // ✅ Like message
    } else {
      post.likes.splice(post.likes.indexOf(req.user.userId), 1);
      message = "You unliked the post"; // ✅ Unlike message
    }

    await post.save();

    res.status(200).json({ success: true, message }); // 🟢 Send dynamic message
  } catch (error) {
    console.log("profile error", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


const getEditProfilePostController = async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.status(200).json({ success: true, message: "id", edit: post });

  // res.render("edit", { post });
};

const editProfilePostController = async (req, res) => {
  // const postId = req.params.id;

  try {
    const post = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json({ success: true, message: "content updated" });
  } catch (error) {
    console.log("edit profile", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// profilepic show

const profilePicController = async (req, res) => {
  // console.log(req.file)
  const user = await userModel.findOne({ email: req.user.email });
  try {
    if (!user) {
      return res.send("user not found ");
    }
    user.profilepic = req.file.filename;
    await user.save();
    res.status(200).json({ success: true, message: "Pic upload successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Intarnal server error",
      error: error.message,
    });
  }
};

// user see other user post
const getAllPostSeeController = async (req, res) => {
  try {
    const allUser = await userModel.find().populate("posts");
    res
      .status(200)
      .json({ success: true, message: "data fatched", user: allUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// delete post
const deletePostController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await postModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ success: true, message: "post deleted" });
  } catch (error) {
    console.log("deletePost error", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
  registerController,
  loginController,
  logutController,
  getProfileController,
  profileController,
  profileLikesController,
  getEditProfilePostController,
  editProfilePostController,
  profilePicController,
  getAllPostSeeController,
  deletePostController,
};

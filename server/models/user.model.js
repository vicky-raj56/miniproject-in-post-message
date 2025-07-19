import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age:{
    type:Number,
    required:true
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  profilepic:{
    type:String,
    default:"default.webp"
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;

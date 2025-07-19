import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/miniproject");
    console.log("mogodb is conneted");
  } catch (error) {
    console.log("mogodb error", error);
  }
};
export default connectDB;

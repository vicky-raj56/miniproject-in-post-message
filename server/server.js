import express from "express";
const app = express();
import userRourter from "./routes/user.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import path from "path"

connectDB();

app.use(cors({
  origin: "http://localhost:5173", // ✅ frontend ka URL
  credentials: true,               // ✅ allow cookies
}));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("", userRourter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

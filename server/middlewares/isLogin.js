import jwt from "jsonwebtoken";
const isLogedIn = async (req, res, next) => {
  const token = req.cookies.token;
    // console.log(token)
  if (!token || token === "") {
    // return res.redirect("/login")
    return res
      .status(401)
      .json({ success: false, message: "User unathenticated pls login first" });
  } else {
    const data = jwt.verify(token, "shhh");
    req.user = data;
    next();
  }
};

export default isLogedIn;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DataContext } from "../Context/UserContext";

const Registration = () => {
  const { serverUrl } = useContext(DataContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    age: "",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(serverUrl + "/register", user,{
          withCredentials: true
      });
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/login")
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "somthing went wrong");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-100 h-120   border-2 border-zinc-800 rounded-md">
        <div className="w-90 ml-4">
          <form className="flex flex-col gap-2 " onSubmit={submitHandler}>
            <h2 className="text-3xl text-center mt-2">Registration </h2>
            <input
              onChange={inputHandler}
              className="outline-none border-2 border-zinc-700 w-full px-3 py-2 rounded-md text-xl"
              type="text"
              name="name"
              placeholder="enter name... "
              value={user.name}
            />
            <input
              onChange={inputHandler}
              className="outline-none border-2 border-zinc-700 w-full px-3 py-2 rounded-md text-xl "
              type="text"
              name="username"
              placeholder=" enter username... "
              value={user.username}
            />
            <input
              onChange={inputHandler}
              className="outline-none border-2 border-zinc-700 w-full px-3 py-2 rounded-md text-xl "
              type="email"
              name="email"
              placeholder="enter email... "
              value={user.email}
            />
            <input
              onChange={inputHandler}
              className="outline-none border-2 border-zinc-700 w-full px-3 py-2 rounded-md text-xl "
              type="password"
              name="password"
              placeholder="enter password... "
              value={user.passowrd}
            />
            <input
              onChange={inputHandler}
              className="outline-none border-2 border-zinc-700 w-full px-3 py-2 rounded-md text-xl "
              type="number"
              name="age"
              placeholder="age... "
              value={user.age}
            />

            <button className="bg-blue-700 w-full text-xl px-2 py-2 cursor-pointer rounded-xl">
              Registration
            </button>
            <div className="ancor cursor-pointer">
              All ready have an account?:
              <Link className="text-blue-900" to={"/login"}>
                {" "}
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;

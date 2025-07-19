import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../Context/UserContext";

const Login = () => {
  const{isAuthenticated,setIsAuthenticated}=useContext(DataContext)
  const navigate = useNavigate()
  const { serverUrl } = useContext(DataContext);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(serverUrl + "/login", login,{
          withCredentials: true
      });
      setIsAuthenticated(true)
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/profile")
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "somthing went wrong");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-100 h-120   border-2 border-zinc-800 rounded-md">
        <div className="w-90 ml-4 mt-5">
          <form className="flex flex-col gap-2 " onSubmit={submitHandler}>
            <h2 className="text-3xl text-center mt-2">Login </h2>
            <input
              onChange={inputHandler}
              className="outline-none border-2 border-zinc-700 w-full px-3 py-2 rounded-md text-xl "
              type="email"
              placeholder="enter email... "
              name="email"
              value={login.email}
            />
            <input
              onChange={inputHandler}
              className="outline-none border-2 border-zinc-700 w-full px-3 py-2 rounded-md text-xl "
              type="password"
              placeholder="enter password... "
              name="password"
              value={login.password}
            />

            <button className="bg-blue-700 w-full text-xl px-2 py-2 cursor-pointer rounded-xl">
              Login
            </button>
            <div className="ancor cursor-pointer">
              Don't have an account?:
              <Link className="text-blue-900" to={"/registration"}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

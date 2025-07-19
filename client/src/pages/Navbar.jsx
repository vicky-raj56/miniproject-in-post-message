import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../Context/UserContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, serverUrl } =
    useContext(DataContext);
  const logutHandler = async (e) => {
    if (e.target.click) {
      const res = await axios.get(serverUrl + "/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsAuthenticated(true);
        navigate("/login");
      }else{
        setIsAuthenticated(false);

      }
    }
  };
  return (
    <div className="bg-gray-400 py-5 mt-1 w-[98vw]  rounded-md  mr-2 ml-2">
      <nav className="flex items-center justify-center gap-3">
        <Link
          className=" text-md cursor-pointer  hover:border-b-2 hover:border-red-700 font-semibold   px-2 py-2  "
          to={"/"}
        >
          Home
        </Link>
        <Link
          className=" text-md cursor-pointer hover:border-b-2 hover:border-red-700 font-semibold   px-2 py-2  "
          to={"/registration"}
        >
          Registration
        </Link>
        <Link
          className=" text-md cursor-pointer hover:border-b-2 hover:border-red-700 font-semibold   px-2 py-2  "
          to={"/profile"}
        >
          profile
        </Link>
        {isAuthenticated ? (
          <button
            onClick={logutHandler}
            className="text-md cursor-pointer hover:border-b-2 hover:border-red-700 font-semibold px-2 py-2 bg-transparent border-none"
          >
            Logout
          </button>
        ) : (
          <Link
            className=" text-md cursor-pointer hover:border-b-2 hover:border-red-700 font-semibold   px-2 py-2  "
            to={"/login"}
          >
            Login
          </Link>
        )}
        <Link
            className=" text-md cursor-pointer hover:border-b-2 hover:border-red-700 font-semibold   px-2 py-2  "
            to={"/showPost"}
          >
            see-other-posts
          </Link>
      </nav>
    </div>
  );
};

export default Navbar;

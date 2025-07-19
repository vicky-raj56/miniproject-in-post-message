import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/UserContext";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { serverUrl } = useContext(DataContext);
  const [data, setData] = useState({ content: "" });
  const [info, setInfo] = useState(null); // ✅ safer than {}

  // Submit new post
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(serverUrl + "/profile", data, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      setData({ content: "" });
      fetchData(); // ✅ Refresh user posts
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Get profile data
  const fetchData = async () => {
    try {
      const res = await axios.get(serverUrl + "/profile", {
        withCredentials: true,
      });
      setInfo(res.data.user);
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const deleteHandler = async (id) => {
    try {
      if (!id) {
        return console.log("id undefined");
      }
      const res = await axios.post(
        serverUrl + "/delete/" + id,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      fetchData();
      navigate("/profile");
    } catch (error) {
      console.log("delete post error", error);
    }
  };

  // ⏳ While data is loading
  if (!info) {
    return <div className="text-white p-4">Loading your profile...</div>;
  }

  return (
    <div className="w-screen bg-zinc-700 text-white p-4">
      <div className="ml-2">
        <div className="flex gap-4 items-center mb-4">
          <Link
            className="text-blue-400 inline-block border border-zinc-500 rounded-md px-2 py-1 hover:bg-zinc-600"
            to={"/img-upload"}
          >
            Click here to upload your pic
          </Link>
        </div>

        <div className="profilepic flex items-center gap-3 mb-4">
          <div className="w-20 h-20 rounded-md overflow-hidden">
            <img
              className="w-full h-full object-cover  border border-zinc-500"
              src={
                info.profilepic
                  ? serverUrl + "/uploads/" + info.profilepic
                  : "/default-profile.png"
              }
              alt={info.name}
            />
          </div>
          <h1 className="text-xl font-semibold">
            Hello, <span className="text-light">{info.name}</span> 👋
          </h1>
        </div>

        <h5 className="mb-3">You can create a new post.</h5>
        <form onSubmit={submitHandler}>
          <textarea
            onChange={(e) => setData({ ...data, content: e.target.value })}
            className="resize-none w-1/3 bg-transparent border-2 border-zinc-800 outline-none rounded-md p-3 block text-white"
            name="content"
            required
            placeholder="What's on your mind?"
            value={data.content}
          />
          <button
            type="submit"
            className="w-40 cursor-pointer px-3 py-2 bg-blue-500 rounded-md font-medium mt-2"
          >
            Create a new post
          </button>
        </form>

        <div className="Posts mt-20">
          <h3 className="text-zinc-400 mb-2">Your Posts:</h3>
          <div className="postContainer mt-4">
            {(info.posts || [])
              .slice() // ✅ copy array
              .reverse() // ✅ latest first
              .map((post, idx) => (
                <div
                  key={idx}
                  className="post w-1/3 p-4 mb-3 border border-zinc-600 bg-zinc-800 rounded-md"
                >
                  <h1 className="text-blue-500 mb-2">@{info.username}</h1>
                  <p className="text-sm tracking-tight">{post.content}</p>
                  <div className="btns flex mt-4 gap-2">
                    <Link className="text-blue-400" to={`/likes/${post._id}`}>
                      Like
                    </Link>
                    <Link className="text-zinc-400" to={`/edit/${post._id}`}>
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(post._id)}
                      className="text-zinc-400 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../Context/UserContext";
// import toast from "react-hot-toast";

const EditPost = () => {
  const navigate = useNavigate();
  const { serverUrl,isAuthenticated } = useContext(DataContext);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [content,setContent] = useState("")
  // console.log(id);
  const fetchData = async () => {
    try {
      const res = await axios.get(serverUrl + "/edit/" + id, {
        withCredentials: true,
      });
      console.log(res.data.edit);
      setData(res.data.edit);
    } catch (error) {
      console.log("get edit data error", error);
    }
  };
  // fetchData()
  useEffect(() => {
    fetchData();
    
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(serverUrl +"/update/"+id,{content}, {
        withCredentials: true,
      });
      // console.log(res.data)
      navigate("/profile");
    } catch (error) {
      console.log("update error", error);
      isAuthenticated(false)
    }
  };
  useEffect(() => {
    if (data) {
      setContent(data.content); // ✅ only when data is loaded
    }
  }, [data]);
  // console.log(data);
  if (!data) {
    return <div>loading....</div>;
  }
  return (
    <div classNameName="ml-2">
      <h5 className="mb-5 mt-6 ">edit your post.</h5>
      <form onSubmit={submitHandler}>
        <textarea onChange={(e)=>{setContent(e.target.value)}}
          className="resize-none w-1/3 bg-transparent border-2 border-zinc-800 outline-none rounded-md p-3 block"
          name="content"
          value={content}
          placeholder="what's on your mind ?"
        />
         
        <button className="w-40 ml-25 cursor-pointer px-3 py-2 bg-yellow-600 rounded-md font-weight-md block mt-2">
          Update post
        </button>
      </form>
    </div>
  );
};

export default EditPost;

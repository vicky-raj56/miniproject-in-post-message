import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { DataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(DataContext);
  const [file, setFile] = useState(null);
  const inputHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.success("please select a file");
    }
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(serverUrl + "/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/profile");
      toast.success(res.data.message);
    } catch (error) {
      console.log("upload failed", error);
      toast.error(error.response?.data?.message || "something went wrong");
    }
  };
  return (
    <div className="w-full h-screen bg-zinc-700 text-white">
      {/* <h1 className="text-xl mb-2">Upload your image</h1> */}
      <form onSubmit={submitHandler}>
        <div>
          {/* <!-- <input  type="file" name="image" value="chooseImage" /> --> */}
          <label className="block text-white mb-2">Upload your image</label>
          <input
            onChange={inputHandler}
            type="file"
            name="image"
            className="text-sm cursor-pointer text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <input
            className="bg-blue-500 px-2 py-2 text-xl rounded-[10px] cursor-pointer"
            type="submit"
            value="Upload image"
          />
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;

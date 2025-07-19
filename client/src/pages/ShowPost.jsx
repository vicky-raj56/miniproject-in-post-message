import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/UserContext";
import axios from "axios";

const ShowPost = () => {
  const [data, setData] = useState([]);
  const { serverUrl } = useContext(DataContext);

  const fetchData = async () => {
    try {
      const res = await axios.get(serverUrl + "/user-post", {
        withCredentials: true,
      });
      console.log(res.data.user)
      setData(res.data.user);
    } catch (error) {}
  };
 useEffect(()=>{
   fetchData();
 },[])

 if(!data){
  return <div>null...</div>
 }
  
  return (
    <div className="w-screen bg-zinc-700 text-white p-4">
      <div className="Posts mt-20">
        <h3 className="text-zinc-400 mb-2">All Users Posts:</h3>
        <div className="postContainer flex gap-4  flex-wrap   mt-4">
          {/* {(data.posts || [])
              .slice() // ✅ copy array
              .reverse() // ✅ latest first
              .map((post, idx) => ( */}

          {data.map((post, idx) => (
            post.posts.map((user,id)=>(
              <div
                key={id}
                className="post w-110 p-4 mb-3 border border-zinc-600 bg-zinc-800 rounded-md"
              >
                <h1 className="text-blue-500 mb-2">@ {post.username}</h1>
                <p className="text-sm tracking-tight">{user.content}</p>
                  <small class="mt-2 block">
                { user.likes?.length || 0 }Likes</small>
                <div className="btns flex mt-4 gap-2">

                  <a className="text-blue-400" href={`/likes/${user._id}`}>
                    Like 
                  </a>
                  <a className= " hidden text-zinc-400" href={`/edit/${post._id}`}>
                    Edit
                  </a>
                </div>
              </div>

            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowPost;

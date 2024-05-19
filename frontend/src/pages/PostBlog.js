import React, { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
// import Spinner from 'react-flowbite'
import CommetSection from "../components/CommetSection";
const PostBlog = () => {
 
  const {id}=useParams()
  console.log(id)
    const [single,setSingle]=useState('')
    const [loading,setLoading]=useState(false)
  useEffect(()=>{
     const fetchSinglePost=async()=>{
      try{
           setLoading(true)
        const response = await axios.get(
          `http://localhost:5000/api/post/getpostid/${id}`
        );
          if(response.status===200){ 
            setSingle(response.data)
            setLoading(false)
          }
         

        

      }catch(error){
        console.log(error)
      }


    }
    fetchSinglePost();
  },[id])
  
  // console.log(single)
  // const repl = single.content.replace(/<[^>]*>/g, "");
  
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        {loading&&<p>loading...</p>}
      </div>
      <div>
        <h2>{ single.content}</h2>
      </div>
      <div>
        <h3>{single.category}</h3>
      </div>
      <div className="w-full object-cover">
        <img src={`http://localhost:5000/${single.image}`} />
      </div>
      <div className="flex justify-between">
        <span> {new Date(single.createdAt).toLocaleString() }</span>
        <span>3min</span>
      </div>
      <h1>{single.title}</h1>
      <CommetSection id={single._id}/>

    </div>
  );
};

export default PostBlog;

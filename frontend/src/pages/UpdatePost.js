import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useNavigate, useParams } from "react-router-dom";
import { Button, TextInput, Select } from "flowbite-react";
import axios from "axios";

const UpdatePost = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const [singlepost, setSinglepost] = useState(null);
  // const loading = useSelector((state) => state.getpost.loading);
  const navigate=useNavigate()
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "select category",
    content: "",
  });

  useEffect(() => {

    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/post/getpostid/${id}`
        );
        if (response.status === 200) {
          setSinglepost(response.data);
        }
      } catch (error) {
           console.log(error)     
           }
    };
    fetchPostData();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const forms = new FormData();
    for (const key in formData) {
      forms.append(key, formData[key]);
    }

    forms.append("image", image);

    const token = localStorage.getItem("access-token");
    try {
      const response = await axios.put(
        `http://localhost:5000/api/post/update/${id}`,
        forms,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status===200){

        navigate("/dashboard?tab=post");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="text-center">
        <h1 className="text-3xl text font-semibold">Edit Post</h1>
      </div>
      {singlepost && (
        <form className="flex flex-col p-3 gap-3" onSubmit={handleSubmit}>
          <div className="flex  gap-3  md:flex-row md:justify-between flex-col items-center">
            <TextInput
              type="text"
              className="w-60"
              value={formData.title}
              placeholder={singlepost.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <Select
              className="w-60"
              value={singlepost.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="select category">select category</option>
              <option value="javascript">javascript</option>
              <option value="react js">react json</option>
              <option value="next js">next js</option>
              <option value="node js">node js</option>
            </Select>
          </div>
          <TextInput
            className="flex border-black border-solid border-4 md:w-full md:justify-between p-4 gap-2"
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <ReactQuill
            theme="snow"
            placeholder={singlepost.content}
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
            required
            className="h-72 mb-10"
          />
          <Button type="submit" outline className="mt-3">
            Edit
          </Button>
        </form>
      )}

      <div className="flex justify-center"></div>
    </div>
  );
};

export default UpdatePost;

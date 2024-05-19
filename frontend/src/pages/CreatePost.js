import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "select category",
    content: "",
  });
  const [publish, setPublish] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const forms = new FormData();
    for (const key in formData) {
      forms.append(key, formData[key]);
    }

    forms.append("image", image);

    const token = localStorage.getItem("access-token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/post/create",
        forms,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      // console.log(data.slug);

      if (data.status === 200) {
        // Check response status
        setPublish("You published successfully");
        navigate(`/post${data.slug}`);
      } else {
        setPublish("Failed to publish");
      }
    } catch (error) {
      setPublish("Failed to publish");
    }
  };
  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="text-center">
        <h1 className="text-3xl text font-semibold">Create Post</h1>
      </div>
      <form className="flex flex-col p-3 gap-3" onSubmit={handleSubmit}>
        <div className="flex  gap-3  md:flex-row md:justify-between flex-col items-center">
          <TextInput
            type="text"
            className="w-60"
            value={formData.title}
            placeholder="Title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <Select
            className="w-60"
            value={formData.category}
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
          placeholder="write something.."
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          required
          className="h-72 mb-10"
        />
        <Button type="submit" outline className="mt-3">
          publish
        </Button>
      </form>

      <div className="flex justify-center"></div>
    </div>
  );
};

export default CreatePost;

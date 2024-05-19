import { current } from "@reduxjs/toolkit";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import { RiErrorWarningFill } from "react-icons/ri";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerSliceAction } from "../redux/register/registerSlice";
import { FaSortAmountDown } from "react-icons/fa";

const ProfileDashboard = () => {
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const currentUser = useSelector((state) => state.register.currentUser);
  const [modal, setModal] = useState(false);
  const loading = useSelector((state) => state.register.loading);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    uesername: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const handleCChange = (event) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in user) {
      formData.append(key, user[key]);
    }
    formData.append("image", image);
    try {
      dispatch(registerSliceAction.updateStart());
      const token = localStorage.getItem("access-token");

      const response = await axios.put(
        `http://localhost:5000/api/auth/update/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        dispatch(registerSliceAction.updateFailure(data.message));
      }
      const data = response.data;
      console.log(data);

      if (response.ok) {
        dispatch(registerSliceAction.updateSuccess(data));

        setUpdateSuccess("update successfully");
      }
    } catch (error) {
      dispatch(registerSliceAction.updateFailure(error.message));
    }
  };
  const handleDelete = async () => {
    dispatch(registerSliceAction.deleteStart());
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/auth/delete/${currentUser._id}`
      );
      if (!response.ok) {
        dispatch(registerSliceAction.deleteFailure(response.message));
      } else {
        const data = response.data;
        dispatch(registerSliceAction.deleteSuccess(data.user));
        navigate("/signup");
      }
    } catch (error) {
      dispatch(registerSliceAction.deleteFailure(error.message));
    }
  };
  const handleSignout = async () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");
    navigate("/signin");
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>profile</h1>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput
            className="text-slate-50"
            name="username"
            type="text"
            placeholder={currentUser.username}
            defaultValue={user.uesername}
            onChange={handleCChange}
          />
          <TextInput
            className="text-slate-50"
            name="email"
            placeholder={currentUser.email}
            type="email"
            defaultValue={user.email}
            onChange={handleCChange}
          />
          <TextInput
            className="text-slate-50"
            name="password"
            type="password"
            defaultValue={user.password}
            onChange={handleCChange}
          />{" "}
          <TextInput
            className="text-slate-100"
            name="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button className="w-full" type="submit" outline>
            Update
          </Button>
          {updateSuccess && <p>{updateSuccess}</p>}
          {currentUser.isAdmin && (
            <Link to="/createpost">
              {" "}
              <Button className="w-full" type="button" outline>
                create post
              </Button>
            </Link>
          )}
        </form>
      </div>

      <div className="flex flex-row justify-around gap-10">
        <Button onClick={() => setModal(true)}>Delete Account</Button>
        <Button onClick={handleSignout}>Sign out</Button>
      </div>
      {updateSuccess && <Alert color="success">{updateSuccess}</Alert>}
      {/* <div> {modal && <DeleteModal />}</div> */}
      <Modal show={modal} onClose={() => setModal(false)} popup size="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center p-4">
            <RiErrorWarningFill className="mx-auto h-6 w-6" />
            <h3 className="text-red-800">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex flex-row gap-4">
              <Button
                className="bg-red-600 text-stone-100"
                onClick={() => handleDelete()}
              >
                yes i'm sure
              </Button>
              <Button onClick={() => setModal(false)} outline>
                No,Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProfileDashboard;

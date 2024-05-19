import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { registerSliceAction } from "../redux/register/registerSlice";
import axios from "axios";

const SignUp = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.register.loading);
  const error = useSelector((state) => state.register.error);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user.username || !user.email || !user.password) {
      dispatch(
        registerSliceAction.signinFailure("All fields must be required")
      );
      return;
    }

    dispatch(registerSliceAction.signinStart());
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        user
      );
      const data = response.data;
      console.log(data.username);
      if (!response.ok) {
        dispatch(registerSliceAction.signinFailure(data.message));
      }
      dispatch(registerSliceAction.signinSuccess(data));
      setUser({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      dispatch(registerSliceAction.signinFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col  md:flex-row  justify-center items-center ml-2">
      <div className="flex flex-col items-center justify-center flex-1">
        <Link to="/" className="text-black  text-4xl flex items-center">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg mr-2">
            geba's
          </span>
          <span className="text-lg font-bold">blog</span>
        </Link>
      </div>
      <div className="ml-3 flex-col justify-center items-center flex-1">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label value="user name" />
            </div>
            <TextInput
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full "
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value=" email" />
            </div>
            <TextInput
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="mb-2 block">
            <Label value="password" />
            <TextInput
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="rounded-md text-lg text-zinc-950 border-2 bg-emerald-600"
            gradientDuoTone="purpleToPink"
          >
            Submit
          </Button>
        </form>{" "}
        <p className="mt-5">
          Have an account?
          <span>
            <Link className="text-fuchsia-500" to="/signin">
              signIn
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

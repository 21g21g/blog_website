import React, { useState } from "react";
import axios from "axios";
import { Link, json, useNavigate } from "react-router-dom";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { registerSliceAction } from "../redux/register/registerSlice";
// import { loginUser } from "../redux/register/registerSlice";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.register.loading);
  const error = useSelector((state) => state.register.error);
  const currentUser = useSelector((state) => state.register.currentUser);
  console.log(currentUser);
  const [user, setUser] = useState({
    email: " ",
    password: " ",
  });
  const handleChange = (event) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value.trim(),
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user.email || !user.password) {
      dispatch(
        registerSliceAction.signinFailure("all feilds must be required")
      );
      return;
    }
    dispatch(registerSliceAction.signinStart());

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        user
      );
      const data = response.data;

      if (data.success === false) {
        dispatch(registerSliceAction.signinFailure(data.message));
      } else {
        dispatch(registerSliceAction.signinSuccess(data.user));
        const token = data.token;
        localStorage.setItem("user", JSON.stringify(data.user)); //because localstorage support string data storage we change it into string before store on the browser.
        localStorage.setItem("access-token", token);
        if (currentUser.isAdmin === true) {
          navigate("/dashboard?tab=profile");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      dispatch(registerSliceAction.signinFailure(error.message));
    }
  };
  //
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
        {/* flex-1 used to give equal width between otheers */}
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block justify-center">
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
          <div className="mb-2 block justify-center">
            <Label value="password" />
            <TextInput
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}

          <Button
            type="submit"
            className="rounded-md text-lg text-zinc-950 border-2 bg-emerald-600"
            gradientDuoTone="purpleToPink"
          >
            SignIn
          </Button>
        </form>
        <p className="mt-5">
          Don't Havhe an account?
          <span>
            <Link className="text-fuchsia-500" to="/signup">
              SignUp
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

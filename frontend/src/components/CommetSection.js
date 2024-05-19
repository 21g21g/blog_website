import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'

const CommetSection = ({ postId}) => {
  const [commets, setCommets] = useState("");
  const currentUser = useSelector((state) => state.register.currentUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/commet/createcommet",{
        commets,
        postId,
        userId:currentUser._id,

        
      }
    );
  };

  const handleChange = (event) => {
    const newvalue = event.target.value;
    if (newvalue.length <= 200) {
      setCommets(newvalue);
    }
  };

  return (
    <div className="flex flex-col border p-6">
      {currentUser ? (
        <div className="flex">
          <p>Signed in as:</p>
          <Link
            to="/dashboard?tab=profile"
            className="hover:underline bg-lime-300"
          >
            <h1>@{currentUser.username}</h1>
          </Link>
        </div>
      ) : (
        <div className="flex flex-row">
          <p>you must be signin first:</p>
          <Link to="/signin">sign in</Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit} className="flex flex-row justify-between">
          <div className="flex gap-4 p-6">
            <input
              max={200}
              type="textarea"
              className="border"
              placeholder="add commets"
              name="commets"
              value={commets}
              onChange={handleChange}
            />
            <button className="text-2xl bg-yellow-400" type="submit">
              submit
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-row justify-between">
        <h1>{200 - commets.length} characters remaining</h1>
        <button className="text-2xl bg-lime-400">Submit</button>
      </div>
    </div>
  );
};

export default CommetSection;

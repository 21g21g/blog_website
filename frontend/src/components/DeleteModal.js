import { Button } from "flowbite-react";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";

const DeleteModal = () => {
  return (
    <div className="flex flex-col  p-10 justify-center items-center bg-white relative">
      <div className="-ml-20 text-black">
        <FaTimes />
      </div>
      <div className="text-black">
        <RiErrorWarningFill />
      </div>
      <div>
        <h2 className="text-black">Are you want to delete an account?</h2>
        <div className="flex flex-row gap-5">
          <Button className="bg-red-600 text-stone-100">yes i'm sure</Button>
          <Button outline>No,Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

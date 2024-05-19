import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col mt-9 items-center border-t-8 border-gray-900 p-5 md:flex-row md:justify-around">
      <div>
        <Link
          to="/"
          className="text-black whitespace-nowrap text-sm sm:text-xl flex items-center"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg mr-2">
            geba's
          </span>
          <span className="text-lg font-bold">blog</span>
        </Link>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 justify-between">
            <h1>About</h1>
            <h1>Follow Us</h1>
          </div>
          <div className="flex flex-row  gap-2 justify-between">
            <h4>20 react js projects</h4>
            <h4>Github</h4>
          </div>
          <div className="flex flex-row  gap-2 justify-between">
            <h4>Geba's blog</h4>
            <h4>discover</h4>
          </div>
        </div>
        <h3>Legal</h3>
        <h3>Privacy policy</h3>
        <h3>Terms and conditions</h3>
        <p>{year}</p>
        <div className="flex flex-row  gap-6">
          <FaFacebook />
          <FaInstagram />
          <FaGithub />
          <FaTwitter />
        </div>
      </div>
    </div>
  );
};

export default Footer;

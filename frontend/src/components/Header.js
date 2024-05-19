import {
  Button,
  Navbar,
  NavbarLink,
  TextInput,
  Dropdown,
  DropdownHeader,
} from "flowbite-react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSunny } from "react-icons/io";
import facebook from "../assets/facebook (1).png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { themeSliceactions } from "../redux/theme/themeSlice";
import { registerSliceAction } from "../redux/register/registerSlice";
import { horizontalsliceAction } from "../redux/horizontalscroll/horizontal";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const horizontal = useSelector((state) => state.horizontal.horizontal);
  const currentUser=useSelector((state)=>state.register.currentUser)
  // console.log(currentUser.image)
  const image = `http://localhost:5000/${currentUser.image}`;
  const [show,setShow]=useState(false)
  const themeClick = () => {
    dispatch(themeSliceactions.toggleTheme());
  };
  const horzontalScroll = (content) => {
    dispatch(horizontalsliceAction.setHorizontal(content));
  };
// `http://localhost:5000/${post.image}`;
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="text-black whitespace-nowrap text-sm sm:text-xl flex items-center"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg mr-2">
          geba's
        </span>
        <span className="text-lg font-bold">blog</span>
      </Link>
      <form className="flex items-center">
        <TextInput
          className="hidden md:inline px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 flex-1"
          type="text"
          placeholder="Search..."
          rightIcon={FaSearch}
        />
      </form>
      <Button className="w-12 h-12 inline md:hidden" color="black" pill>
        <FaSearch />
      </Button>{" "}
      <Navbar.Collapse className="mt-4 md:mt-0  ">
        <NavbarLink className="mx-2">
          <NavLink onClick={() => horzontalScroll("home")} to="/">
            Home
          </NavLink>
          {horizontal === "home" && <hr></hr>}
        </NavbarLink>
        <NavbarLink className="mx-2">
          <NavLink onClick={() => horzontalScroll("about")} to="/about">
            About
          </NavLink>
          {horizontal === "about" && <hr></hr>}
        </NavbarLink>
        <NavbarLink className="mx-2">
          <NavLink onClick={() => horzontalScroll("project")} to="/project">
            Project
          </NavLink>
          {horizontal === "project" && <hr></hr>}
        </NavbarLink>
      </Navbar.Collapse>
      <div className="flex items-center space-x-4">
        <Button className="w-11 h-10 inline" color="black" onClick={themeClick}>
          {theme === "light" ? <IoMdSunny /> : <FaRegMoon />}
        </Button>
        <Link to="/signin">
          <Button className=" bg-slate-600" outline>
            sign in
          </Button>
        </Link>

        <div className="flex gap-2">
          <img
            src={image}
            className=" w-full h-10 object-cover rounded-full cursor-pointer"
          />
          <div>
            <Dropdown>
              <Link to="/dashboard?tab=profile">
                <DropdownHeader>profile</DropdownHeader>
              </Link>
              <Link>
                <DropdownHeader>logout</DropdownHeader>
              </Link>
            </Dropdown>
          </div>
        </div>

        <Navbar.Toggle className="md:hidden" />
      </div>
    </Navbar>
  );
};

export default Header;

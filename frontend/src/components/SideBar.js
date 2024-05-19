import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { CiSignpostR1 } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa6";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { Link } from "react-router-dom";
import ProfileDashboard from "./ProfileDashboard";
import { useSelector } from "react-redux";
const SideBar = () => {
  const currentUser = useSelector((state) => state.register.currentUser);
  const location = useLocation();
  const path=location.pathname
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromurl = urlParams.get("tab");
    if (tabFromurl) {
      setTab(tabFromurl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          {currentUser.isAdmin && (
            <div>
              <Link to="/dashboard">
                <SidebarItem>
                  <div className="flex flex-row gap-3">
                    <AiOutlineDashboard />
                    Dashboard
                  </div>
                </SidebarItem>
              </Link>

              <Link to="/dashboard?tab=profile">
                <SidebarItem
                  active={tab === "profile" || "post"}
                  label={currentUser.isAdmin ? "Admin" : "User"}
                  labelColor="dark"
                >
                  <div className="flex flex-row gap-2">
                    {<FaRegUser />}
                    profile
                  </div>
                </SidebarItem>
              </Link>

              <Link to="/commets">
                <SidebarItem>
                  <div className="flex flex-row gap-3">
                    <FaCommentDots />
                    Commets
                  </div>
                </SidebarItem>
              </Link>
              <Link to="/dashboard?tab=users">
                <SidebarItem active={tab === "users"}>
                  <div className="flex flex-row gap-3">
                    <FaUsers />
                    Users
                  </div>
                </SidebarItem>
              </Link>
              
              <Link to="/dashboard?tab=post">
                <SidebarItem active={tab === "post"}>
                  <div className=" flex flex-row gap-2">
                    <CiSignpostR1 />
                    Post
                  </div>
                </SidebarItem>
              </Link>
            </div>
          )}

          <SidebarItem>
            <div className="flex flex-row gap-2">
              {<FaSignOutAlt />}sign out
            </div>
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default SideBar;

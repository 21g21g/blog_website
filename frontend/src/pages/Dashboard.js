import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useLocation } from "react-router-dom";

import ProfileDashboard from "../components/ProfileDashboard";
import DashboardComponent from "../components/DashboardComponent";
import UserDashboard from "../components/UserDashboard";
const Dashboard = () => {
  const location = useLocation(); //allows you to access the current location object in your components. The location object represents where the app is currently navigated to in the browser's address bar. It contains information about the current URL, including the pathname, search parameters, hash, and state.
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const tabFromurl = urlParams.get("tab");
    if (tabFromurl) {
      setTab(tabFromurl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row md:min-h-screen">
      <div>
        <SideBar />
      </div>
      <div className="flex justify-center">
        {tab === "profile" && <ProfileDashboard />}
        {tab === "post" && <DashboardComponent />}
        {tab==="users" &&<UserDashboard/>}
      </div>
    </div>
  );
};

export default Dashboard;

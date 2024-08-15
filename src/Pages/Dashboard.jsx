import React, { useEffect, useState } from "react";
import DashboardSidebar from "../Components/DashboardSidebar";
import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import DashboardProfile from "../Components/DashboardProfile";
import CreateTourPackages from "./CreateTourPackages";
import CreateGuide from "./CreateGuide";


const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); //returns the location//dashboard
    const tabUrl = urlParams.get("tab"); //returns the tab//tab=profile
    if (tabUrl) {
      setTab(tabUrl); //profile
    }
  }, [location.search]);
  return (
    <div className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <DashboardSidebar />
          </div>
          <div className="col-md-10">
            {tab === "profile" && <DashboardProfile />}
            {tab === "create-tours" && <CreateTourPackages />}
            {tab === 'create-guide' && <CreateGuide />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

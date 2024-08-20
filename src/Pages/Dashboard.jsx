import React, { useEffect, useState } from "react";
import DashboardSidebar from "../Components/DashboardSidebar";
import Header from "../Components/Header";
import { Link, useLocation } from "react-router-dom";
import DashboardProfile from "../Components/DashboardProfile";
import CreateTourPackages from "./CreateTourPackages";
import CreateGuide from "./CreateGuide";
import { useSelector } from "react-redux";
import EditTours from "../Components/EditTours";
import DisplayBooking from "../Components/DisplayBooking";
import Footer from "../Components/Footer";

const Dashboard = () => {
  const { currentuser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState('');
  const [tourId, setTourId] = useState('');
  const userId = currentuser.rest._id
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    if (tabUrl) {
      const [tabPart, idPart] = tabUrl.split('/');
      setTab(tabPart);
      if (idPart) {
        setTourId(idPart); // Set the tour ID if it exists
      }
    }
  }, [location.search]);
  return (
    <div className="">
      <div className="container-fluid vh-100">
        <div className="row">
          <div className="col-md-2">
            <DashboardSidebar />
          </div>
          <div className="col-md-10">
            {tab === "profile" && <DashboardProfile />}
            {tab === "create-tours" && <CreateTourPackages />}
            {tab === "create-guide" && <CreateGuide />}
            {tab === `edit-tours` && tourId && <EditTours tourId={tourId}/>}
            {tab === "display-bookings" && <DisplayBooking userId={userId} />}
          </div>
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

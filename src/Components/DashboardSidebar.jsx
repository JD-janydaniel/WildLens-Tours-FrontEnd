import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../Redux/Slice/authSlice";
import { IoIosCreate } from "react-icons/io";

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {currentuser} = useSelector((state)=> state.user)
  const [tab, setTab] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); //returns the location//dashboard
    const tabUrl = urlParams.get("tab"); //returns the tab//tab=profile
    if (tabUrl) {
      setTab(tabUrl); //profile
    }
  }, [location.search]);

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    toast.success("You have been successfully logged out");
  };

  return (
    <div>
      {/* <div className="container-fluid">
        <div className="row"> */}
          <div className="sidebar border p-0 bg-body-teritary min-vh-100">
            {/* //col-md-3 col-lg-2 */}
            <div
              className="offcanvas-md offcanvas-end bg-body-teritary"
              tabIndex={-1}
              id="sidebarMenu"
              aria-labelledby="sidebarMenuLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="sidebarMenuLabel">
                  Company name
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#sidebarMenu"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 ">
              {/* //overflow-y-hidden */}
                <ul className="nav flex-column">
                <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center gap-2"
                      to="/"
                    >
                      <FaHome className="fs-4 text-secondary" />
                      Home
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center gap-2"
                      to="/about"
                    >
                      <HiInformationCircle className="fs-4 text-secondary" />
                      About
                    </Link>
                    </li>
                  <li className="nav-item">
                    <Link
                      to="/dashboard?tab=profile"
                      className={`nav-link d-flex  align-items-center gap-2 ${tab === "profile" ? "active" : ""}`}
                      aria-current="page"
                      as='div'
                    >
                      <FaRegUserCircle className="fs-4 text-secondary" />
                      Profile
                      <span
                        className="badge text-bg-secondary"
                        // style={{ margin: "0px 0px 0px 100px" }}
                      >
                       {currentuser.rest.isAdmin ? "Admin" : "User" }
                      </span>
                    </Link>
                  </li>
                  {currentuser.rest.isAdmin && (
                    <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center gap-2"
                      to="/dashboard?tab=create-tours"
                    >
                      <IoIosCreate className="fs-4 text-secondary" />
                     Create Tours
                    </Link>
                    </li>
                  )}
                  {currentuser.rest.isAdmin && (
                    <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center gap-2"
                      to="/dashboard?tab=create-guide"
                    >
                      <IoIosCreate className="fs-4 text-secondary" />
                     Create Guide
                    </Link>
                    </li>
                  )}
                  <hr />
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center gap-2"
                      onClick={handleSignOut} role="button"
                    >
                      <PiSignOutBold className="fs-4 text-secondary"/>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    //   </div>
    // </div>
  );
};

export default DashboardSidebar;

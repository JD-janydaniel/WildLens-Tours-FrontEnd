import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaWolfPackBattalion } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";
import "../index.css";
import { toggleTheme } from "../Redux/Slice/themeSlice";
import { signOutSuccess } from "../Redux/Slice/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { currentuser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    toast.success("You have been successfully logged out");
    navigate("/signin");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <FaWolfPackBattalion className="fs-1 text-primary" />
          <NavLink
            to="/"
            className="navbar-brand p-1 fw-bold fst-italic fs-3 rounded-4"
          >
            <span>WildLens</span>
            <span> Tours !</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse fw-medium fs-5 navbar-collapse"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
              <NavLink to="/tours" className="nav-link">
                WildLife Tours
              </NavLink>
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </div>
          </div>
          <button
            className="btn me-2 border-0 rounded-5"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "bg-light text-dark" ? <FaMoon /> : <FaSun />}
          </button>
          <div className="d-flex">
            {currentuser ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link"
                    data-toggle="dropdown"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="profile-pic rounded-5">
                      <img src={currentuser?.rest?.profilePicture} alt="user" />
                    </div>
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <p className="dropdown-item text-center">
                        {currentuser?.rest?.username}
                      </p>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/dashboard?tab=profile"
                      >
                        <CgProfile className="fs-4 me-2" /> Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={handleSignOut}
                        role="button"
                      >
                        <PiSignOutBold className="fs-4 me-2" /> Sign Out
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <NavLink
                to="/signin"
                className="btn button-signin border-0 fw-medium px-4 focus-ring"
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

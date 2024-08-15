import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaWolfPackBattalion } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    
      <div className="container-fluid px-3">
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
          <div className="col mb-3">
            <FaWolfPackBattalion className="fs-1 text-primary" />
            <span className="footer-brand p-1 fs-4 fst-italic ms-2 rounded-4 fw-medium">
              WildLens Tours!
            </span>
          </div>
          <div className="col mb-3"></div>
          <div className="col mb-3">
            <h6>Frontend Libraries</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  Features
                </a>
              </li>
              <li className="nav-item mb-2">
                <Link href="#" className="nav-link p-0">
                  Pricing
                </Link>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div className="col mb-3">
            <h6>Frontend packages</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  Features
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  Pricing
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div className="col mb-3">
            <h6>Backend Packages</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  Features
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  Pricing
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0">
                  About
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center fw-bolder">
            <span className="mb-3 mb-md-0">
              @Jany Daniel © {new Date().getFullYear()} Company, Inc. All rights
              reserved.
            </span>
          </div>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <Link className="" href="#">
                <FaLinkedin className="fs-2" />
              </Link>
            </li>
            <li className="ms-3">
              <Link className="" href="#">
                <FaGithub className="fs-2" />
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    
  );
};

export default Footer;

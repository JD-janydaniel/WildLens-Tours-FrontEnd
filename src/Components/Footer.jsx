import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaWolfPackBattalion } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    
      <div className="container-fluid lead px-3">
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
                <Link to="https://react-redux.js.org/" target="_blank" className="nav-link p-0">
                 React Redux
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/redux-persist' target="_blank" className="nav-link p-0">
                  Redux persist
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/react-router-dom' target="_blank" className="nav-link p-0">
                  React Router Dom
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/axios' target="_blank" className="nav-link p-0">
                  Axios
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://react-bootstrap.github.io/' target="_blank" className="nav-link p-0">
                  React Bootstrap
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://getbootstrap.com/' target="_blank" className="nav-link p-0">
                  React Bootstrap
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://react-icons.github.io/react-icons/' target="_blank" className="nav-link p-0">
                  React Icon
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://firebase.google.com/' target="_blank" className="nav-link p-0">
                  Firebase
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/react-circular-progressbar' target="_blank" className="nav-link p-0">
                  React Circular Progressbar
                </Link>
              </li>
              
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/react-toastify' target="_blank" className="nav-link p-0">
                  React Toastify
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/react-dom' target="_blank" className="nav-link p-0">
                  React DOM
                </Link>
              </li>
            </ul>
          </div>
          <div className="col mb-3">
            <h6>Frontend framework</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to='https://react.dev/' target="_blank" className="nav-link p-0">
                 React
                </Link>
              </li>
            </ul>
          </div>
          <div className="col mb-3">
            <h6>Backend Framework</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/express' target="_blank" className="nav-link p-0">
                  Express
                </Link>
              </li>
              <h6>Backend Libraries</h6>
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/bcryptjs' target="_blank" className="nav-link p-0">
                  Bcryptjs
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/jsonwebtoken' target="_blank" className="nav-link p-0">
                 Jsonwebtoken
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://mongoosejs.com/' target="_blank" className="nav-link p-0">
                  Mongoose
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/dotenv' target="_blank" className="nav-link p-0">
                  Dotenv
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/nodemailer' target="_blank" className="nav-link p-0">
                  Nodemailer
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to='https://www.npmjs.com/package/cors' target="_blank" className="nav-link p-0">
                  Cors
                </Link>
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
              <Link className="" to='https://www.linkedin.com/in/jany-daniel-934360208'>
                <FaLinkedin className="fs-2" />
              </Link>
            </li>
            <li className="ms-3">
              <Link className="" to='https://github.com/JD-janydaniel'>
                <FaGithub className="fs-2" />
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    
  );
};

export default Footer;

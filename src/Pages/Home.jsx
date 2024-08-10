import React from "react";
import { Link } from "react-router-dom";
import { FaWolfPackBattalion } from "react-icons/fa";
import "../index.css";

const Home = () => {
  return (
    <div>
      <div className="container p-5">
        <div className="row p-5">
          <div className="col-12  px-4 py-5">
            <h1 className="text-center display-3 fw-bold linear-text-gradient">
              {" "}
              <FaWolfPackBattalion className="display-1 text-primary me-4" />
              Hi there, Welcome to
            </h1>
            <h1 className="text-center display-3 fw-bold linear-text-gradient">
              WildLens Tours !👋
            </h1>
            <p className="text-center fs-3 lead">
              "This is the <b className="linear-text-gradient">Demo Project</b>"
            </p>
            <div className="d-flex justify-content-center ">
              <Link
                className="btn button-color border-0 rounded-5 px-5 fs-3 mt-3 btn-lg focus-ring"
                to="/signup"
              >
                Getstarted
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

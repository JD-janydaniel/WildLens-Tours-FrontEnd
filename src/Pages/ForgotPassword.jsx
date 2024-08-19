import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMailSendFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {currentuser}=useSelector((state)=>state.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email };
    await axios
      .post(
        "http://localhost:5000/api/auth/forgot-password",
        payload
      )
      .then((res) => {
        toast.success(res.data.message);
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
    setEmail("");
  };
  return (
    <div>
      <div className="container signup mt-5">
        <div className="row py-4">
          <div className="col-12 col-md-6 align-self-center px-4 py-5  shadow rounded-4 order-2 overflow-auto">
            <h1 className="text-center mb-3 linear-text-gradient">
              Forgot Password ?
            </h1>
            <h3 className="text-center fs-3 lead">
              Enter Your Registered Email Address
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group input-group-lg mb-3">
                <span
                  className="input-group-text fw-medium"
                  id="inputGroup-sizing-lg"
                >
                  Email
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="d-flex flex-column  justify-content-center">
                <button
                  type="submit"
                  className="btn mt-3 fs-5 border-0 rounded-4"
                >
                  Send
                  <RiMailSendFill className="fs-4 ms-2 text-warning" />
                </button>
              </div>
            </form>
          </div>
          <div className="col-12 col-md-6 px-4 py-5 order-1 overflow-auto">
            <div className="column2 rounded-4  text-center mt-md-5">
              <h1 className="display-3 py-md-4 py-5 fw-bold ">
                WildLens Tours !
              </h1>
            </div>
            <div>
              <h3 className="mt-sm-4 fs-3 lead">
                Reset your password easily by requesting a secure link.
              </h3>
              <h3 className="fs-3 lead">
                Check your email for the link to set a new password and regain
                access.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../Redux/Slice/authSlice";
import OAuth from "../Components/OAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return dispatch(signUpFailure("Please fill out the fields"));
    }
    try {
      dispatch(signUpStart());
      const response = await fetch(
        "http://localhost:5000/api/auth/register-user",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.message));
        toast.error(data.message);
      }
      if (response.ok) {
        dispatch(signUpSuccess(data));
        // toast.success(data.message);
        navigate("/signin");
      }
    } catch (error) {
      dispatch(signUpFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="container signup mt-5">
        <div className="row">
          <div className="col-12 col-md-6 px-4 py-5 shadow rounded-4 order-2 overflow-auto">
            <h1 className="text-center mb-3 linear-text-gradient">Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-group input-group-lg mb-3">
                <span
                  className="input-group-text fw-medium"
                  id="inputGroup-sizing-lg"
                >
                  User Name
                </span>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  required
                  placeholder="Enter your User Name"
                  onChange={handleChange}
                />
              </div>
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
                  onChange={handleChange}
                />
              </div>
              <div className="input-group input-group-lg mb-3">
                <span
                  className="input-group-text fw-medium"
                  id="inputGroup-sizing-lg"
                >
                  Password
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  required
                  placeholder="Enter Your Password"
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex flex-column  justify-content-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn mt-3 fs-5 border-0 rounded-4"
                >
                  {loading ? (
                    <>
                      <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <OAuth />
              </div>
            </form>
            <div>
              <p className="mt-3">
                Already Have an Account ? <Link to="/signin">Sign In</Link>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 px-4 py-5 order-1 overflow-auto">
            <div className="column2 rounded-4  text-center mt-md-5">
              <h1 className="display-3 py-md-4 py-5 fw-bold ">
                WildLens Tours !
              </h1>
            </div>
            <div>
              <h3 className="mt-md-4 fs-3 lead">
                Sign Up effortlessly with your username, email and password, or
                enjoy the convenience of using
                <span className="text-primary fs-2">G</span>
                <span className="text-danger fs-2">o</span>
                <span className="text-warning fs-2">o</span>
                <span className="text-primary fs-2">g</span>
                <span className="text-success fs-2">l</span>
                <span className="text-danger fs-2">e</span>!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

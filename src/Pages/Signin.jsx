import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/Slice/authSlice";
import OAuth from "../Components/OAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out the fields"));
    }
    try {
      dispatch(signInStart());
      const response = await fetch(
        "https://wildlens-tours-backend-culd.onrender.com/api/auth/login-user",
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
        dispatch(signInFailure(data.message));
        toast.error(data.message);
      }
      if (response.ok) {
        localStorage.setItem("Token",data.token);
        dispatch(signInSuccess(data));
        toast.success(data.message);
        navigate("/tours");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="container signup mt-5">
        <div className="row">
          <div className="col-12 col-md-6 px-4 py-5 shadow rounded-4 order-2 overflow-auto">
            <h1 className="text-center mb-3 linear-text-gradient">Sign In</h1>
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
                    "Sign In"
                  )}
                </button>
                <OAuth />
              </div>
              <div>
                <p className="mt-3">
                  Don't Have An Account Please!<Link to="/signup">Sign UP</Link>
                </p>
                <Link to="/forgot-password">Forgot Password !</Link>
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
              <h3 className="mt-md-4 fs-3 lead">
                Sign In effortlessly with your email and password, or enjoy the
                convenience of using
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

export default Signin;

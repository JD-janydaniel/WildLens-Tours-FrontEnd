import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInFailure, signInSuccess } from "../Redux/Slice/authSlice";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:5000/api/auth/google-auth", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          profilePic: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("Token",data.token);
        dispatch(signInSuccess(data));
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className="d-flex flex-column  justify-content-center">
      <button
        type="button"
        onClick={handleSubmit}
        className="btn mt-3 fs-5 border-0 rounded-4"
      >
        Continue With Google
        <FcGoogle className="fs-4 ms-2" />
      </button>
    </div>
  );
};

export default OAuth;

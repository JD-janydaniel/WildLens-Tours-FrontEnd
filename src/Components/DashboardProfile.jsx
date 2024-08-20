import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../Redux/Slice/authSlice";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const DashboardProfile = () => {
  const dispatch = useDispatch();
  const { currentuser, loading, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  
  const filePickerRef = useRef();

  //onchange in the image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  //uploading process
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  //upload image to firebase

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload the image (File size must be less than 2MB)"
        );
        toast.error(
          "OOPS! Could not upload the image (File size must be less than 2MB)"
        );

        setImageFileUrl(null);
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  //onchange in the input field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    // condition for check wether any changes made are not
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No Changes Made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait while the image is uploading");
      return;
    }
    try {
      dispatch(updateStart());
      const response = await fetch(
        `https://wildlens-tours-backend-culd.onrender.com/api/user/update-user/${currentuser.rest._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
        toast.error(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess(data.message);
        toast.success(data.message);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
      toast.error(error.message);
    }
  };
  //signOut user
  const handleSignOut = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    toast.success("You have been successfully logged out");
  };
  //delete user
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await fetch(
        `https://wildlens-tours-backend-culd.onrender.com/api/user/delete-user/${currentuser.rest._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
      } else {
        dispatch(deleteUserSuccess(data));
        toast.success(data.message);
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message);
    }
  };
  return (
    <div className=" p-3">
      <div className="shadow py-2 rounded-2">
        <h3 className="text-center display-4 mt-3">Profile</h3>
        <form onSubmit={handleSubmit} className="p-3 signup">
          <input
            type="file"
            accept="image/*"
            ref={filePickerRef}
            onChange={handleImageChange}
            hidden={true}
          />
          <div
            className="position-relative mb-2 d-flex flex-column"
            onClick={() => filePickerRef.current.click()}
            style={{ width: "150px", height: "150px" }}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                className="position-absolute"
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62,150,200,${imageFileUploadProgress / 100})`,
                  },
                }}
              />
            )}

            <img
              src={imageFileUrl || currentuser.rest.profilePicture}
              alt="User"
              className={`rounded-pill border border-5 ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-50"
              }`}
              style={{ width: "150px", height: "150px" }}
            />
            {/* {imageFileUploadError && (
              <div className="alert alert-danger" role="alert">
                {imageFileUploadError}
              </div>
            )} */}
          </div>

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
              placeholder="UserName"
              defaultValue={currentuser.rest.username}
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
              placeholder="name@company.com"
              defaultValue={currentuser.rest.email}
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
              placeholder="**********"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex flex-row  justify-content-around align-items-center">
          <button
            type="submit"
            className="btn btn-lg border-0"
            disabled={loading || imageFileUploading}
          >
            {loading ? "loading..." : "update"}
          </button>
          {console.log(currentuser)}
          </div>
        </form>
        {currentuser.rest.isAdmin && (
            <Link className="d-flex justify-content-center text-decoration" to="/dashboard?tab=tours">
              <button type="submit" className="btn btn-lg border-0 text-decoration" >
                Create Tours
              </button>
            </Link>
          )}
        <div className="mt-2 mb-3 d-flex justify-content-around">
          <span
            className="text-danger"
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Delete Account
          </span>
          <span className="text-danger " onClick={handleSignOut} role="button">
            Sign Out
          </span>
        </div>
        {/* {updateUserSuccess && (
          <div className="alert alert-success" role="alert">
            {updateUserSuccess}
          </div>
        )}
        {updateUserError && (
          <div className="alert alert-danger" role="alert">
            {updateUserError}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )} */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title text-danger fs-5"
                  id="exampleModalLabel"
                >
                  Delete User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body text-center fs-4">
                <BsExclamationTriangleFill className="text-danger display-5 me-3" />
                Are you sure you want to delete this user ?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary border-0"
                  data-bs-dismiss="modal"
                >
                  No, Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary border-0"
                  onClick={handleDelete}
                >
                  yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;

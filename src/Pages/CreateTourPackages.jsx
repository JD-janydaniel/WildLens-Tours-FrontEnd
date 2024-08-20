import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTourPackages = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    price: "",
    noOfDays: "",
  });
  const [createToursError, setCreateToursError] = useState(null);
  const navigate = useNavigate();

  //image upload
  const handleUploadimage = async () => {
    try {
      if (!file) {
        setImageFileUploadError("Please select an image file");
        toast.error("Please select an image file");
        return;
      }
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("Image upload failed");
          toast.error("Image upload failed");
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadProgress(null);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadURL });
            toast.success("Image uploaded successfully");
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("Image upload failed");
      setImageFileUploadProgress(null);
      toast.error("Image upload failed");
      console.log(error);
    }
  };

  //create tours
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://wildlens-tours-backend-culd.onrender.com/api/tour/create-tours",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setCreateToursError(data.message);
        toast.error(data.message);
        return;
      } else {
        setCreateToursError(null);
        toast.success("Tours package created successfully");
        setFormData({
          title: "",
          description: "",
          image: "",
          location: "",
          price: "",
          noOfDays: "",
        });
        navigate("/dashboard?tab=create-tours");
      }
    } catch (error) {
      setCreateToursError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4 mt-4 shadow rounded-4">
      <h1 className="text-center mb-4 linear-text-gradient">
        Create Tours Package
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-lg mb-3">
          <span
            className="input-group-text fw-medium"
            id="inputGroup-sizing-lg"
          >
            Tour Title
          </span>
          <input
            type="text"
            id="title"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Enter the tour title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="input-group input-group-lg mb-3">
          <span
            className="input-group-text fw-medium"
            id="inputGroup-sizing-lg"
          >
            Tour Description
          </span>
          <textarea
            type="text"
            rows={2}
            id="description"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Enter the tour description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="input-group input-group-lg mb-3">
          <span
            className="input-group-text fw-medium"
            id="inputGroup-sizing-lg"
          >
            Tour Location
          </span>
          <input
            type="text"
            id="location"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Enter the tour Location"
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
        <div className="input-group input-group-lg mb-3">
          <span
            className="input-group-text fw-medium"
            id="inputGroup-sizing-lg"
          >
            Price
          </span>
          <input
            type="text"
            id="price"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Enter the tour price"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <div className="input-group input-group-lg mb-3">
          <span
            className="input-group-text fw-medium"
            id="inputGroup-sizing-lg"
          >
            No of Days
          </span>
          <input
            type="text"
            id="noOfDays"
            className="form-control"
            aria-label="Start Date"
            aria-describedby="inputGroup-sizing-lg"
            onChange={(e) =>
              setFormData({ ...formData, noOfDays: e.target.value })
            }
          />
        </div>
        <div
          className="mb-3 py-3 d-flex justify-content-around rounded-3 "
          style={{ border: "4px dashed green" }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="btn border-0 btn-sm"
            type="button"
            onClick={handleUploadimage}
            disabled={imageFileUploadProgress}
          >
            {imageFileUploadProgress ? (
              <div>
                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
        {/* {imageFileUploadError && (
          <div className="alert alert-danger" role="alert">
            {imageFileUploadError}
          </div>
        )} */}
        {formData.image && (
          <img
            className="mb-3"
            style={{ height: "300px", width: "300px" }}
            src={formData.image}
            alt="upload"
          />
        )}
        <div className="d-flex justify-content-center ">
          <button type="submit" className="btn btn-lg border-0">
            Create Tours
          </button>
        </div>
        {/* {createToursError && (
          <div className="alert alert-danger" role="alert">
            {createToursError}
          </div>
        )} */}
      </form>
    </div>
  );
};

export default CreateTourPackages;

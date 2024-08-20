import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditTours = ({ tourId }) => {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [editToursError, setEditToursError] = useState(null);
  const navigate = useNavigate();

  // Fetch the existing tour data when the component mounts
  useEffect(() => {
    if (tourId) {
        fetchTourData(tourId);
      }
  }, [tourId]);

  const fetchTourData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tour/getToursById/${id}`);
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }else{
        setFormData(data.tours);
        toast.success("Tour details loaded successfully");
      }
      setFormData(data.tours); // Populate form with existing tour data
    } catch (error) {
      toast.error("Failed to load tour details");
    }
  };

  // Handle image upload
  const handleUploadImage = async () => {
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
      console.error(error);
    }
  };

  // Handle form submission to update the tour
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tourId) {
        toast.error("Tour ID not found");
        return;
      }
  
    try {
      const response = await fetch(
        `https://wildlens-tours-backend-culd.onrender.com/api/tour/update-tours/${tourId}`,
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
        setEditToursError(data.message);
        toast.error(data.message);
        return;
      } else {
        setEditToursError(null);
        toast.success("Tour package updated successfully");
        navigate("/tours");
      }
    } catch (error) {
      setEditToursError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4 mt-4 shadow rounded-4">
      <h1 className="text-center mb-4 linear-text-gradient">
        Edit Tours
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-lg mb-3">
          <span className="input-group-text fw-medium" id="inputGroup-sizing-lg">
            Tour Title
          </span>
          <input
            type="text"
            id="title"
            className="form-control"
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="input-group input-group-lg mb-3">
          <span className="input-group-text fw-medium" id="inputGroup-sizing-lg">
            Tour Description
          </span>
          <textarea
            rows={2}
            id="description"
            className="form-control"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="input-group input-group-lg mb-3">
          <span className="input-group-text fw-medium" id="inputGroup-sizing-lg">
            Tour Location
          </span>
          <input
            type="text"
            id="location"
            className="form-control"
            value={formData.location || ""}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
        <div className="input-group input-group-lg mb-3">
          <span className="input-group-text fw-medium" id="inputGroup-sizing-lg">
            Price
          </span>
          <input
            type="text"
            id="price"
            className="form-control"
            value={formData.price || ""}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div className="input-group input-group-lg mb-3">
          <span className="input-group-text fw-medium" id="inputGroup-sizing-lg">
            No of Days
          </span>
          <input
            type="text"
            id="noOfDays"
            className="form-control"
            value={formData.noOfDays || ""}
            onChange={(e) => setFormData({ ...formData, noOfDays: e.target.value })}
          />
        </div>
        <div
          className="mb-3 py-3 d-flex justify-content-around rounded-3"
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
            onClick={handleUploadImage}
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
        {formData.image && (
          <img
            className="mb-3"
            style={{ height: "300px", width: "300px" }}
            src={formData.image}
            alt="Tour"
          />
        )}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-lg border-0">
            Update Tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTours;

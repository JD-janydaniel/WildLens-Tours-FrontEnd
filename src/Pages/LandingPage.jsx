import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiRupee } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Modal from "react-bootstrap/Modal";
import { FaStar } from "react-icons/fa";

const LandingPage = () => {
  const [tourData, setTourData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false); // State to control the review modal visibility
  const [showViewReviewsModal, setShowViewReviewsModal] = useState(false); // State to control the view reviews modal visibility
  const [selectedTour, setSelectedTour] = useState(null); // State to store selected tour for review
  const [rating, setRating] = useState(0); // State for star rating value
  const [reviewText, setReviewText] = useState(""); // State for review text
  const [reviews, setReviews] = useState([]); // State for storing reviews of a selected tour
  const { currentuser } = useSelector((state) => state.user); // Get user data from Redux store

  useEffect(() => {
    fetchData();
  }, [searchTerm]); // Trigger data fetch when searchTerm changes

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tour/getAllTours?search=${searchTerm}`
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("Fetching tour data failed");
      } else {
        setTourData(data.tours);
        toast.success(data.message);
        console.log(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    fetchData(); // Fetch the data after setting the search term
  };

  // Function to open review modal
  const handleShowReviewModal = (tour) => {
    setSelectedTour(tour); // Set the selected tour for which the review is being added
    setShowReviewModal(true); // Show the review modal
  };

  // Function to close review modal
  const handleCloseReviewModal = () => {
    setShowReviewModal(false); // Hide the review modal
    setSelectedTour(null); // Reset selected tour
    setRating(0); // Reset rating
    setReviewText(""); // Reset review text
  };

  // Function to submit the review and rating
  const handleReviewSubmit = async () => {
    try {
      const reviewDetails = {
        userId: currentuser.rest._id, // Get the current user's ID from Redux state
        tourId: selectedTour._id, // Use the ID of the selected tour
        rating, // Use the selected rating
        review: reviewText, // Use the input review text
      };

      const response = await fetch(
        "http://localhost:5000/api/review/create-review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewDetails),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error); // Display error message if submission fails
      } else {
        toast.success(data.message); // Display success message if submission is successful
        fetchData(); // Refresh tour data to display the new review
        handleCloseReviewModal(); // Close the review modal
      }
    } catch (error) {
      toast.error(error.message); // Display error message for any caught errors
    }
  };

  // Function to open view reviews modal
  const handleShowViewReviewsModal = async (tour) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/review/getTourReviews/${tour._id}`
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("Fetching reviews failed");
      } else {
        console.log("Reviews fetched:", data.reviews);
        setReviews(data.reviews); // Set the fetched reviews
        setSelectedTour(tour); // Set selected tour
        setShowViewReviewsModal(true); // Show the view reviews modal
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching reviews:", error);
    }
  };

  // Function to close view reviews modal
  const handleCloseViewReviewsModal = () => {
    setShowViewReviewsModal(false); // Hide the view reviews modal
    setSelectedTour(null); // Reset selected tour
    setReviews([]); // Reset reviews state
  };

  const renderStars = (rating) => {
    const filledStars = Math.round(rating);
    const totalStars = 5;
    return (
      <div className="star-rating">
        {Array.from({ length: totalStars }, (v, i) => (
          <FaStar
            key={i}
            className={i < filledStars ? "text-warning" : "text-muted"}
          />
        ))}
      </div>
    );
  };

  const handleDeleteTour = async (tour) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tour/delete-tours/${tour._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        toast.error("Failed to delete tour");
      } else {
        toast.success("Tour deleted successfully");
        fetchData(); // Refresh tour data after deletion
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container lead px-5">
      <div className="row rounded-4 shadow py-3 mt-3">
        <div className="col-12 d-flex justify-content-center">
          <form role="search" className="" onSubmit={handleSearch}>
            <div className="input-group  mb-3" style={{ width: "600px" }}>
              <input
                type="seatch"
                className="form-control"
                placeholder="Search by loacation budget schedule"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search by loacation budget schedule"
                aria-describedby="button-addon2"
              />
              <button
                className="btn border-0 "
                type="submit"
                id="button-addon2"
              >
                <CiSearch className="fs-3 text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        {tourData.map((element, index) => {
          return (
            <div key={index} className="col-12 col-md-4 mt-5  mb-2 ">
              <div className="card mb-3 h-100 shadow-lg">
                <div className="rounded-3">
                  <img
                    src={element.image}
                    style={{ height: "250px" }}
                    className="card-img-top p-4"
                    alt="tour image"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">{element.description}</p>
                  <p className="card-text">
                    <IoLocationOutline className="fs-4 me-2" />
                    {element.location}
                  </p>
                  <p className="card-text">
                    <CiCalendarDate className="fs-4 me-2" />
                    {element.noOfDays}
                  </p>
                  <p className="card-text">
                    <BiRupee className="fs-4 me-2" />
                    {element.price}
                  </p>
                  {/* Display average rating with 5 stars */}
                  <div className="card-text">
                    {element.averageRating
                      ? renderStars(element.averageRating)
                      : "No Ratings Yet"}
                  </div>
                </div>
                <div className="card-body d-flex  flex-column">
                  <Link
                    to={`/booking/${element._id}`}
                    className="btn border-0 "
                  >
                    Book Now
                  </Link>
                </div>
                <div className="card-body gap-4 d-flex justify-content-between">
                  <button
                    className="btn border-0"
                    onClick={() => handleShowReviewModal(element)}
                    style={{ width: "150px" }}
                  >
                    Give your Review
                  </button>
                  <button
                    className="btn border-0"
                    onClick={() => handleShowViewReviewsModal(element)}
                    style={{ width: "150px" }}
                  >
                    View Reviews
                  </button>
                </div>
                {currentuser.rest.isAdmin && (
                  <div className="card-body gap-4 d-flex justify-content-between">
                    <Link
                      className="btn border-0"
                      style={{ width: "150px" }}
                      to={`/dashboard/?tab=edit-tours/${element._id}`}
                    >
                      Edit Tour
                    </Link>
                    <button
                      className="btn border-0"
                      onClick={() => handleDeleteTour(element)}
                      style={{ width: "150px" }}
                    >
                      Delete Tour
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal for giving review */}
      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Give your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`fs-3 ${i < rating ? "text-warning" : "text-muted"}`}
                onClick={() => setRating(i + 1)} // Set the rating based on clicked star
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)} // Update review text
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseReviewModal}
          >
            Close
          </button>
          <button className="btn btn-primary" onClick={handleReviewSubmit}>
            Submit Review
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal for viewing reviews */}
      <Modal show={showViewReviewsModal} onHide={handleCloseViewReviewsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tour Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="mb-3">
                <h6>{review.userId.username}</h6>
                <div className="d-flex">
                  {renderStars(review.rating)}
                  <span className="ms-2">{review.rating}/5</span>
                </div>
                <p>{review.review}</p>
                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
              </div>
            ))
          ) : (
            <p>No reviews yet for this tour.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LandingPage;

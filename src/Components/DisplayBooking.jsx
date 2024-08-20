import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DisplayBooking = ({ userId }) => {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `https://wildlens-tours-backend-culd.onrender.com/api/booking/getAllBooking/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast.error(data.message);
      } else {
        setBooking(data.bookings);
        console.log(data.bookings);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container lead">
      <h1 className="text-center display-4 mt-4 linear-text-gradient">
        My Booking
      </h1>
      <div className="row">
        {booking.length === 0 ? (
          <p className="text-center">No bookings found.</p>
        ) : (
          booking.map((element) => (
            <div key={element._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">
                    <strong>Name:</strong> {element.name}
                  </p>
                  <p className="card-text">
                    <strong>Phone Number:</strong> {element.phoneNumber}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {element.address}
                  </p>
                  <p className="card-text">
                    <strong>Number of People:</strong> {element.numberOfPeople}
                  </p>
                  <p className="card-text">
                    <strong>Check-In Date:</strong>
                    {new Date(element.checkInDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Booking Date:</strong>
                    {new Date(element.bookingDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Total Price:</strong> ${element.totalPrice}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>
                    <span
                      className={`badge ${
                        element.status === "confirmed"
                          ? "text-bg-success"
                          : element.status === "pending"
                          ? "text-bg-warning"
                          : element.status === "cancelled"
                          ? "text-bg-danger"
                          : ""
                      }`}
                    >
                      {element.status}
                    </span>
                  </p>
                  <p className="card-text">
                    <strong>Transaction ID:</strong> {element.transactionId}
                  </p>
                  <p className="card-text">
                    <strong>Payment Status:</strong>{" "}
                    <span
                      className={`badge ${
                        element.paymentStatus === "completed"
                          ? "text-bg-success"
                          : element.paymentStatus === "pending"
                          ? "text-bg-warning"
                          : element.paymentStatus === "failed"
                          ? "text-bg-danger"
                          : ""
                      }`}
                    >
                      {element.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayBooking;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Bookings = () => {
  const { id } = useParams();
  const [tourData, setTourData] = useState([]);
  const { currentuser } = useSelector((state) => state.user);
  const [guideData, setGuideData] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [guideValue, setGuideValue] = useState("");
  const [personValue, setPersonValue] = useState(1);
  const [checkInValue, setCheckInValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(tourData.price || 0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTourData();
    fetchGuideData();
  }, []);

  //fetching the tour data
  const fetchTourData = async () => {
    try {
      const response = await fetch(
        `https://wildlens-tours-backend-culd.onrender.com/api/tour/getToursById/${id}`
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("Fetching booking data failed");
      } else {
        setTourData(data.tours);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //fetch Guide Data

  const fetchGuideData = async () => {
    try {
      const response = await fetch(
        "https://wildlens-tours-backend-culd.onrender.com/api/guide/getAllTourGuides"
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("Fetching guide data failed");
      } else {
        setGuideData(data.tourGuides);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const totalAmount = Number(personValue) * Number(tourData.price);

  //create booking
  const handleBooking = async (e) => {
    e.preventDefault();
    const bookingDetails = {
      userId: currentuser.rest._id, 
      tourId: tourData._id, 
      guideId: guideValue, // Accessing the guide ID from guideValue state
      name: nameValue, // Accessing the name from nameValue state
      phoneNumber: phoneNumberValue, // Accessing the phone number from phoneNumberValue state
      address: address, // Accessing the address from address state
      numberOfPeople: personValue, // Accessing the number of people from personValue state
      checkInDate: checkInValue, // Accessing the checkInDate from checkInValue state
      totalPrice: totalAmount, // Accessing the totalPrice from totalAmount variable
    };

    //post request to create booking
    try {
      const response = await fetch(
        "https://wildlens-tours-backend-culd.onrender.com/api/booking/create-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        }
      );
      console.log(bookingDetails);
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setNameValue("");
        setGuideValue("");
        setPersonValue(1);
        setCheckInValue("");
        setPhoneNumberValue("");
        setAddress("");
        setTotal(tourData.price);
        navigate("/dashboard?tab=display-bookings");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container ">
      <div className="row py-2 mt-2 mb-3">
        <h1 className="text-center linear-text-gradient display-5 mb-4">Tour Booking</h1>
        <div className="col-md-5 shadow-lg rounded-5 d-flex flex-wrap  justify-content-center  ms-2">
          <h5 className="linear-text-gradient display-6 mb-2">{tourData.title}</h5>
          <img
            className="img-thumbnail"
            src={tourData.image}
            style={{ width: "540px", height: "400px" }}
          />
        </div>
        <div className="col-md-6 rounded-5 shadow-lg p-2 ms-5 d-block">
          <h5 className="linear-text-gradient text-center">Booking Deatils</h5>
          <hr />
          <div>
            <div className="input-group input-group-lg mb-3">
              <span
                className="input-group-text fw-medium"
                id="inputGroup-sizing-lg"
              >
                Name :
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                required
                onChange={(e) => setNameValue(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="input-group input-group-lg mb-3">
              <span
                className="input-group-text fw-medium"
                id="inputGroup-sizing-lg"
              >
                phone number:
              </span>
              <input
                type="tel"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                required
                pattern="[0-9]{10}"
                onChange={(e) => setPhoneNumberValue(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text fw-bold">Addess</span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                placeholder="Enter your address"
                required
                rows={2}
                onChange={(e)=>setAddress(e.target.value)}
              />
            </div>

            <div className="input-group input-group-lg mb-3">
              <span
                className="input-group-text fw-medium"
                id="inputGroup-sizing-lg"
              >
                Tour Title
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                required
                value={tourData.title}
                disabled
              />
            </div>
            <div className="input-group input-group-lg mb-3">
              <span
                className="input-group-text fw-medium"
                id="inputGroup-sizing-lg"
              >
                Description
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                required
                value={tourData.description}
                disabled
              />
            </div>
            <select
              className="form-select float-end mb-3 ms-2"
              aria-label="Default select example"
              onChange={(e) => setGuideValue(e.target.value)}
            >
              <option value="">Choose your guide name</option>
              {guideData.map((element, index) => {
                return (
                  <option key={index} value={element._id}>
                    {element.name}
                  </option>
                );
              })}
            </select>
            <div className="input-group float-end input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Number Of Person
              </span>
              <input
                type="number"
                value={personValue}
                onChange={(e) => setPersonValue(Number(e.target.value))}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>

            <div
              className="input-group float-end input-group mb-3"
              // style={{ width: "250px" }}
            >
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Check In Date
              </span>
              <input
                type="Date"
                onChange={(e) => setCheckInValue(e.target.value)}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
          </div>
          <h5 className="linear-text-gradient text-center">Amount</h5>
          <hr />
          <div className="d-flex flex-row  justify-content-between">
            <div
              className="input-group float-end input-group mb-3"
              style={{ width: "250px" }}
            >
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Price Per Person
              </span>
              <input
                type="number"
                value={tourData.price}
                disabled
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div
              className="input-group float-end input-group mb-3"
              style={{ width: "250px" }}
            >
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Total Amount
              </span>
              <input
                type="number"
                onChange={(e) => setTotal(e.target.value)}
                value={personValue * tourData.price}
                disabled
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center ">
            <button onClick={handleBooking} className="btn text-white border-0">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiRupee } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

const LandingPage = () => {
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/tour/getAllTours"
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

  return (
    <div className="container px-5">
      <div className="row">
        {tourData.map((element, index) => {
          return (
            <div key={index} className="col-12 col-md-4 mt-5  mb-2 ">
              <div className="card mb-3 h-100 shadow-lg">
                <div className="rounded-3">
                <img
                  src={element.image}
                  style={{ height: "300px" }}
                  className="card-img-top p-4"
                  alt="tour image"
                />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <p className="card-text">{element.description}</p>
                  <p className="card-text"><IoLocationOutline className="fs-4 me-2" />{element.location}</p>
                  <p className="card-text">
                    <CiCalendarDate className="fs-4 me-2"/>{element.noOfDays} Days
                  </p>
                  <p className="card-text"><BiRupee className="fs-4 me-2"/>{element.price}</p>
                </div>
                <div className="card-body d-flex flex-column">
                  <Link to={`/booking/${element._id}`} className="btn border-0 btn-lg">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;

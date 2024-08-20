import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateGuide = () => {
    const [formData,setFormData] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://wildlens-tours-backend-culd.onrender.com/api/guide/create-tour-guide',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                "token": localStorage.getItem('Token')
              },
              body: JSON.stringify(formData)
            })
            const data = await response.json();
            if(!response.ok){
              toast.error(data.message)
              return;
            }else{
              toast.success("Guide created successfully")
              navigate('/dashboard')
              
            }
          } catch (error) {
            toast.error(error.message)
          }

    }
    return (
        <div className='shadow-lg rounded-4 py-2 px-5 mt-5'>
            <h1 className='text-center  linear-text-gradient'>Create Guide</h1>
            <form onSubmit={handleSubmit} className='mt-4'>
            <div className="input-group input-group-lg mb-3">
          <span
            className="input-group-text fw-medium"
            id="inputGroup-sizing-lg"
          >
            Name
          </span>
          <input
            type="text"
            id="name"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Enter your name"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
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
            placeholder="name@example.com"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div> 
        <div className="input-group input-group-lg mb-3">
          <span
            className="input-group-text fw-medium"
            id="inputGroup-sizing-lg"
          >
            About Me
          </span>
          <textarea
            type="text"
            id="aboutMe"
            rows={2}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Write some thing about you"
            onChange={(e) =>
              setFormData({ ...formData, aboutMe: e.target.value })
            }
          />
        </div> 
        <div className="input-group input-group-lg mb-3">
          <span
            className="input-group-text fw-medium"
            id="inputGroup-sizing-lg"
          >
            Languages
          </span>
          <input
            type="text"
            id="languages"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Enter the languages known"
            onChange={(e) =>
              setFormData({ ...formData, languages: e.target.value })
            }
          />
        </div> 
        <div className="input-group input-group-lg mb-3">
          <span
            className="input-group-text fw-medium"
            id="inputGroup-sizing-lg"
          >
            Experience
          </span>
          <input
            type="number"
            id="experience"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Enter the no of years experience"
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
          />
        </div> 
        <div className='text-center'>
            <button type="submit" className="btn btn-lg text-white border-0">Create Guide </button>
        </div>
            </form>
        </div>
    );
};

export default CreateGuide;
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function AdminSignUp({ setLoggedInUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    address: "",
    image: null,
  });

 

  const navigate = useNavigate();
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    try {
    const fd = new FormData();
    fd.append('email', formData.email);
    fd.append('password', formData.password);
    fd.append('address', formData.address);
    if (formData.image) fd.append('image', formData.image);
    
    
    await axios.post('http://localhost:5000/adminregister', fd, { withCredentials: true });
    alert('Admin Registered Successfully!');
    navigate('/adminlogin');
    } catch (err) {
    console.error(err.response?.data || err);
    alert('Error registering admin');
    }
    };
  

  return (
    <>

        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
          <div className="card shadow-lg p-4" style={{ width: "400px" }}>
            <h3
              className="text-center mb-4"
              style={{ fontFamily: "Poppins, sans-serif", color: "#004D43" }}
            >
             <div className="logo fw-bold fs-3" ><img src="https://dummyimage.com/80x80/000/fff.png&text=PO" style={{width: "40px", height: "40px", objectFit: "cover", marginRight:"10px", borderRadius:"30px"}} />Portfolio Admin Sign Up</div>
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark w-100">
                SignUp               </button>

             
        
              <div className="text-center mt-3">
                <p>
                  Already have an account? <Link to="/adminlogin">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>

      </>
  );
}

export default AdminSignUp;

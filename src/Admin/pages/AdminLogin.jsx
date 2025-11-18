import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function AdminLogin({ setLoggedInUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    address: "",
    image: null,
  });

 

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://portfolio-backend-ijsg.onrender.com/adminlogin", form, {
        withCredentials: true,
      });
      alert("Login Successful");
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); 
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Login failed");
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
             <div className="logo fw-bold fs-3" ><img src="https://dummyimage.com/80x80/000/fff.png&text=PO" style={{width: "40px", height: "40px", objectFit: "cover", marginRight:"10px", borderRadius:"30px"}} />Portfolio Admin Login</div>
            </h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
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
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

             

              <button type="submit" className="btn btn-dark w-100">
               Login
              </button>

               <div className="text-center mt-3">
                              <p>
                                Don't have an account? <Link to="/adminregister">Go to Signup</Link>
                              </p>
                            </div>
            </form>
          </div>
        </div>

      </>
  );
}

export default AdminLogin;

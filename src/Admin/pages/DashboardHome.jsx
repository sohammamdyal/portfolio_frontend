import axios from 'axios';
import React, { useEffect, useState } from 'react'

import './Card.css';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';


const DashboardHome = () => {
    const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/courses", { withCredentials: true })
  //     .then((res) => setCourses(res.data))
  //     .catch((err) => {
  //       console.error(err.response?.data || err);
  //       alert("Your session has been expired! please logged in again");
  //       navigate("/adminlogin");
  //     });
  // }, []);
   
  return (
    <>
        <div className="container-fluid" style={{ maxWidth: "1300px" }}>
  <motion.h2 className="fw-bold text-start mb-4"
   initial={{ opacity: 0, y: 50 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.6 }}
  > 📊 Dashboard</motion.h2>
  <motion.div
    className="dashboard-banner container-fluid py-2 mb-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="row align-items-center">
      <div className="col-md-6 text-start">
        <motion.h1
          className="fw-bold mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          designed to highlight expertise.
        </motion.h1>

        <motion.button
          className="btn btn-primary px-4 py-2 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Know More
        </motion.button>
        <motion.div
          className="social-links mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a href="#" className="me-3 text-decoration-none text-dark fw-semibold">FACEBOOK</a>
          <a href="#" className="me-3 text-decoration-none text-danger fw-semibold">YOUTUBE</a>
          <a href="#" className="text-decoration-none text-primary fw-semibold">LINKEDIN</a>
        </motion.div>
      </div>

     
    </div>
  </motion.div>

  <hr/>
  
 
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.6 }}
  >
  </motion.div>
</div>

    </>
  )
}

export default DashboardHome

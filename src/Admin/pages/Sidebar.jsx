
import React, { useEffect, useState } from "react";
import "./Sidebar.css"
import { motion } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { FaUserGraduate, FaBook, FaHome, FaLaptop } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { SiCodementor } from "react-icons/si";
const Sidebar = ({ setActive }) => {
    const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = sessionStorage.getItem("userData");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);


const icons = {
  dashboard: <MdDashboard className="me-2" />,
  addhome: <FaHome className="me-2" />,
  addabout: <FaBook className="me-2" />,
  addproject: <FaLaptop className="me-2" />,
  addexperience: <SiCodementor className="me-2" />,
  addskills: <FaUserGraduate className="me-2" />,
  addeducation: <FaUserGraduate className="me-2" />,
  admininquiries: <SiCoursera className="me-2" />,
};
  return (
    <motion.div
  className="sidebar d-flex flex-column"
  initial={{ x: -250, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
>
<div className="logo fw-bold fs-3" ><img src="https://dummyimage.com/80x80/000/fff.png&text=SM" style={{width: "40px", height: "40px", objectFit: "cover", marginRight:"10px", borderRadius:"30px"}} />Portfolio</div>

  {user && (
    <motion.div
      className="profile-card shadow-sm mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <img
        src={user.image || "/4.png"}
        alt={user.username}
        className="rounded-circle"
        style={{ width: "55px", height: "55px", objectFit: "cover" }}
      />
      <h5 className="mb-0 fw-bold">{user.username}</h5>
    </motion.div>
  )}

  <ul className="nav flex-column flex-grow-1 ">
    {["dashboard", "addhome", "addabout", "addproject", "addexperience", "addskills", "addeducation","admininquiries"].map((item, i) => (
      <motion.li
        className="nav-item mb-3"
        key={item}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 + i * 0.2, duration: 0.4 }}
      >
        <button
          onClick={() => setActive(item)}
          className="btn btn-link nav-link"
        >
           {icons[item]}
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      </motion.li>
    ))}
  </ul>

  <motion.div
    className="nav-item"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.5 }}
  >
    <a href="/adminlogin" className="nav-link text-danger fw-bold">
      Logout
    </a>
  </motion.div>
</motion.div>

  );
};

export default Sidebar;

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import AddHome from "../../components/AddHome";
import AddAbout from "../../components/AddAbout";
import AddProject from "../../components/AddProject";
import AdminServices from "./AdminServices";
import BookingUser from './BookingUser';
import AdminInquires from './AdminInquires';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddExperience from "../../components/AddExperience";
import AdminInquiries from "../../components/AdminInquiries";
import AddSkills from "../../components/AddSkills";
import AddEducation from '../../components/AddEducation';
const Dashboard = () => {
    const [activePage, setActive] = useState("dashboard");
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      axios.get("https://portfolio-backend-ijsg.onrender.com/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => setData(res.data))
        .catch((err) => {
          console.error(err.response?.data || err);
          alert("Your session has been expired! please logged in again");
          navigate("/adminlogin");
        });
    }, []);

    const renderContent = () => {
      switch (activePage) {
        case "dashboard":
          return <DashboardHome />;
        case "addhome":
            return <AddHome />;
        case "addabout":
            return <AddAbout />;
        case "addproject":
            return <AddProject />;
        case "addexperience":
            return <AddExperience />;
        case "addskills":
            return <AddSkills />;
        case "addeducation":
            return <AddEducation />;
        case "admininquiries":
            return <AdminInquiries />;
        default:
          return <h2>Welcome!</h2>;
      }
    };
  return (
    <>
     <div className="d-flex " style={{backgroundColor: "#F2F2F2"}}>
      <Sidebar setActive={setActive} />
      <div className="flex-grow-1 p-4">{renderContent()}</div>
    </div>
   
</>
  );
};

export default Dashboard;

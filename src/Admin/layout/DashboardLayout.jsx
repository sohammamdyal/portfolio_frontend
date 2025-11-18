import React from "react";
import Sidebar from "./../components/Sidebar";  
import Dashboard from "./../pages/Dashboard";

const DashboardLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default DashboardLayout;

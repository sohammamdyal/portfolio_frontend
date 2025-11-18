import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get("https://portfolio-backend-ijsg.onrender.com/inquiries");
      setInquiries(res.data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4">
      <h5 className="fw-bold mb-3">📩 Client Inquiries</h5>
      <div className="table-responsive">
        <table className="table custom-table align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Salon</th>
              <th>Service</th>
              <th>Date</th>
              <th>Stylist</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((inq, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{inq.name}</td>
                  <td>{inq.salon}</td>
                  <td>{inq.service}</td>
                  <td>{inq.date}</td>
                  <td>{inq.stylist}</td>
                  <td>{inq.email}</td>
                  <td>{inq.phone}</td>
                  <td>{inq.notes || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInquiries;

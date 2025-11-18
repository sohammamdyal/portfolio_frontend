import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const BookingUser = () => {
  const [bookings, setBookings] = useState([]);


  const fetchBookings = async () => {
    try {
      const res = await axios.get("https://portfolio-backend-ijsg.onrender.com/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };


  const fetchServiceData = async (bookings) => {
    const updatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        if (booking.serviceId) {
          try {
            const res = await axios.get(
              `https://portfolio-backend-ijsg.onrender.com/getservice/${booking.serviceId}`
            );
            return { ...booking, serviceData: res.data };
          } catch (error) {
            console.error("Error fetching service:", error);
            return booking;
          }
        } else {
          return booking;
        }
      })
    );
    setBookings(updatedBookings);
  };

  useEffect(() => {
    const loadBookings = async () => {
      const res = await axios.get("https://portfolio-backend-ijsg.onrender.com/bookings");
      setBookings(res.data);
      fetchServiceData(res.data);
    };
    loadBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`https://portfolio-backend-ijsg.onrender.com/bookings/${id}`);
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  return (
    <div className="container my-4">
      <motion.div
        className="card shadow-sm border-0 rounded-4 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h5 className="fw-bold mb-3">📋 All Bookings</h5>
        <div className="table-responsive">
          <table className="table custom-table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Service Photo</th>
                <th>Service Title</th>
                <th>Price</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Seat</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((b, index) => (
                  <motion.tr
                    key={b._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <td>{index + 1}</td>
                    <td>
                      {b.serviceData?.image ? (
                        <img
                          src={b.serviceData.image}
                          alt={b.serviceData.name}
                          width="45"
                          height="45"
                          className="rounded-circle border border-2"
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>{b.serviceData?.name || b.serviceTitle || "—"}</td>
                    <td>₹{b.serviceData?.price || b.servicePrice}</td>
                    <td>{b.name}</td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td>{b.seat}</td>
                    <td>{b.status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(b._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-muted">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingUser;

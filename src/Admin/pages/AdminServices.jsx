import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Services.css";
import { motion, AnimatePresence } from "framer-motion";

import { HiBellAlert } from "react-icons/hi2";
import { MdOutlineCancel } from "react-icons/md";
const AdminServices = () => {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [open, setOpen] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    steps: "",
    image: ""
  })
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getservices");
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === "file" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: files[0],
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   const fetchNotices = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/notices");
//       setNotices(res.data);
//     } catch (err) {
//       console.error("Error fetching notices:", err);
//     }
//   }

//   const handleDeleteNotice = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/notices/${id}`);
//       setNotices(notices.filter((notice) => notice.id !== id));
//       fetchNotices();
//     } catch (err) {
//       console.error("Error deleting notice:", err);
//     }
//   }

 // POST → Add new student/service
 const handleSubmit = async (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append("name", formData.name);
  form.append("description", formData.description);
  form.append("price", formData.price);
  form.append("steps", formData.steps);
  if (formData.image) {
    form.append("image", formData.image);
  }

  try {
    if (editId) {
           await axios.put(`http://localhost:5000/service/${editId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Service updated successfully!");
    } else {
    
      await axios.post("http://localhost:5000/addservice", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Service added successfully!");
    }

    fetchServices(); 
    setFormData({ name: "", description: "", price: "", steps: "", image: null });
    setShowForm(false);
    setEditId(null);
  } catch (error) {
    console.error("Error adding/updating service:", error);
  }
};


const handleEdit = (service) => {
  setFormData({
    name: service.name,
    description: service.description,
    price: service.price,
    steps: service.steps,
    image: null, 
  });
  setEditId(service._id); 
  setShowForm(true);
};

// const handleUpdate = async (e) => {
//   e.preventDefault();
//   const form = new FormData();
//   form.append("name", formData.name);
//   form.append("description", formData.description);
//   form.append("price", formData.price);
//   form.append("steps", formData.steps);
//   if (formData.image) {
//     form.append("image", formData.image);
//   }

//   await axios.put(
//     `http://localhost:5000/service/${editingService._id}`,
//     form,
//     {
//       headers: { "Content-Type": "multipart/form-data" },
//     }
//   );
//   fetchServices();
//   setEditingService(null);
// };

// const handleDelete = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this service?")) return;

//   try {
//     await axios.delete(`http://localhost:5000/adminservices/${id}`);
//     // remove deleted service from state
//     setStudents(students.filter((student) => student.id !== id));
//   } catch (error) {
//     console.log("Error deleting service: ", error);
//   }
// };
const handleDelete = async(id) => {
if(!window.confirm("Are you sure you want to delete this service?")) return;
  try {
    const res = await fetch(`http://localhost:5000/service/${id}`,{
      method : "DELETE",
    });
    const data = await res.json();
    if(res.ok){
      alert("Service deleted successfully!");
      fetchServices();
    }else{
      alert(data.message || "Error deleting service");
    }
  } catch (error) {
    console.log("Error deleting service: ", error);
  }
}

// PUT → Update existing student/service
// const handleUpdate = async (id) => {
//   try {
//     const res = await axios.put(`http://localhost:5000/adminservices/${id}`, formData);
//     console.log("Updated:", res.data);

//     // Update state after editing
//     setStudents(
//       students.map((student) =>
//         student._id === id ? res.data : student
//       )
//     );

//     setShowForm(false);
//     fetchUsers();
//   } catch (error) {
//     console.log("Error updating data : ", error);
//   }
// };





  return (
    <>
    <div className="d-flex justify-content-center align-items-start w-100 p-5">
      <div style={{ maxWidth: "700px", width: "100%" }}>
      <motion.h2
          className="fw-bold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >👨‍🎓 Saloon Services</motion.h2>

        <div className="text-center mb-4">
        <motion.button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showForm ? "Close Form" : "➕ Add Services"}
          </motion.button>
        </div>

        <div
          className="position-relative text-end "
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          <HiBellAlert size={28} />
          {notices.length > 0 && (
            <span className="position-absolute text-end top-0 translate-middle badge rounded-pill bg-danger">
              {notices.length}
            </span>
          )}
        </div>

        {open && (
          <div
            className="card shadow-sm position-absolute end-0 mt-4"
            style={{ width: "350px", zIndex: 1000 }}
          >
            <div className="card-header bg-primary text-white">
              Notices
            </div>
            <div className="card-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
              {notices.length === 0 ? (
                <p className="text-muted">No new notices</p>
              ) : (
                notices.map((n, index) => (
                  <div key={index} className="mb-3 border-bottom pb-2">
                    <h6 className="mb-1">{n.mentorName}</h6>
                    <small className="text-muted">{n.mentorEmail}</small>
                    <MdOutlineCancel size={20} className="float-end" />
                    <p className="mb-1">{n.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        <AnimatePresence>
        {showForm && (
  <motion.div
    className="card shadow-sm border-0 rounded-4 p-4"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <h5 className="fw-bold mb-3 text-center">
      {editId ? "Edit Service" : "Add New Service"}
    </h5>

    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control rounded-3"
            placeholder="Enter service name"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control rounded-3"
            placeholder="Enter Description"
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Price</label>
          <textarea
            className="form-control rounded-3"
            rows="1"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price"
            required
          ></textarea>
        </div>

        <div className="col-md-6">
          <label className="form-label">Steps</label>
          <textarea
            className="form-control rounded-3"
            rows="1"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            placeholder="Enter Steps"
            required
          ></textarea>
        </div>

        <div className="col-md-6">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-control rounded-3"
            accept="image/*"
          />
          {editId && (
            <div className="mt-2">
              <small className="text-muted">
                Current image will remain unless a new one is uploaded.
              </small>
            </div>
          )}
        </div>

        <div className="col-12 text-center mt-5">
          <motion.button
            type="submit"
            className="btn btn-primary px-4 rounded-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {editId ? "Update Service" : "Save Service"}
          </motion.button>

          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setShowForm(false);
              setEditId(null);
              setFormData({ name: "", description: "", price: "", steps: "", image: null });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </motion.div>
)}
        </AnimatePresence>

          


      </div>
      
    </div>

   <motion.div className="card shadow-sm border-0 rounded-4 p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}>
  <h5 className="fw-bold mb-3">📋 Services List</h5>
  <div className="table-responsive">
    <table className="table custom-table align-middle">
      <thead>
        <tr>
          <th>#</th>
          <th>Photo</th>
          <th>Name</th> 
          <th>Description</th>
          <th>Price</th>
          <th>Steps</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {services.length > 0 ? (
          services.map((student, index) => (
            <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
              <td>{index + 1}</td>
              <td>
                {student.image ? (
                  <img
                    src={student.image}
                    alt={student.name}
                    width="45"
                    height="45"
                    className="rounded-circle border border-2"
                  />
                ) : (
                  "—"
                )}
              </td>
              <td>{student.name}</td>
              <td>{student.description}</td>
              <td>{student.price}</td>
              <td>{student.steps}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(student)}
                >
                  ✏️ Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>handleDelete(student._id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </motion.tr>
          ))
        ) : (
          <tr>
            <td colSpan="9" className="text-center text-muted">
              No students found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  
  </div>
</motion.div>


    </>
    
  );
};

export default AdminServices;

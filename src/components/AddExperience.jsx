import React, { useState, useEffect } from "react";
import axios from "axios";

const AddExperience = () => {
  const [form, setForm] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
    image: null
  });

  const [experiences, setExperiences] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchExperiences = async () => {
    const res = await axios.get("https://portfolio-backend-ijsg.onrender.com/experience");
    setExperiences(res.data);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("role", form.role);
    data.append("company", form.company);
    data.append("duration", form.duration);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`https://portfolio-backend-ijsg.onrender.com/experience/${editId}`, data);
        alert("Experience updated!");
      } else {
        await axios.post("https://portfolio-backend-ijsg.onrender.com/experience", data);
        alert("Experience added!");
      }

      setForm({ role: "", company: "", duration: "", description: "", image: null });
      setEditId(null);
      fetchExperiences();

    } catch (err) {
      console.error(err);
      alert("Error saving experience");
    }
  };


  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      role: item.role,
      company: item.company,
      duration: item.duration,
      description: item.description,
      image: null
    });
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await axios.delete(`https://portfolio-backend-ijsg.onrender.com/experience/${id}`);
    fetchExperiences();
  };

  return (
    <div className="container py-5">
      <h2>{editId ? "Update Experience" : "Add Experience"}</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" name="role" placeholder="Role" className="form-control mb-3" value={form.role} onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company" className="form-control mb-3" value={form.company} onChange={handleChange} required />
        <input type="text" name="duration" placeholder="Duration" className="form-control mb-3" value={form.duration} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" className="form-control mb-3" rows="3" value={form.description} onChange={handleChange} required></textarea>
        <input type="file" onChange={handleFileChange} className="form-control mb-3" />

        <button className="btn btn-primary" type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <hr className="my-5" />

      <h3>All Experiences</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Role</th>
            <th>Company</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.length === 0 ? (
            <tr><td colSpan="6" className="text-center">No experiences found</td></tr>
          ) : experiences.map((item) => (
            <tr key={item._id}>
              <td>
                {item.image ? <img src={`http://localhost:5000/uploads/${item.image}`} width="50" /> : "No Image"}
              </td>
              <td>{item.role}</td>
              <td>{item.company}</td>
              <td>{item.duration}</td>
              <td>{item.description}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddExperience;

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddEducation() {
  const [form, setForm] = useState({
    collegeName: "",
    degree: "",
    from: "",
    to: "",
    percentage: ""
  });

  const [education, setEducation] = useState([]);
  const [editId, setEditId] = useState(null);


  const fetchEducation = async () => {
    const res = await axios.get("http://localhost:5000/education");
    setEducation(res.data);
  };

  useEffect(() => {
    fetchEducation();
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/education/${editId}`, form);
        alert("Education Updated!");
      } else {
        await axios.post("http://localhost:5000/education", form);
        alert("Education Added!");
      }

      setForm({
        collegeName: "",
        degree: "",
        from: "",
        to: "",
        percentage: ""
      });
      setEditId(null);

      fetchEducation();

    } catch (err) {
      alert("Error Saving Education");
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    await axios.delete(`http://localhost:5000/education/${id}`);
    fetchEducation();
  };


  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      collegeName: item.collegeName,
      degree: item.degree,
      from: item.from,
      to: item.to,
      percentage: item.percentage
    });
  };

  return (
    <div className="container mt-4">
      <h2>{editId ? "Update Education" : "Add Education"}</h2>

      <form onSubmit={handleSubmit} className="mt-3">

        <input className="form-control mb-2" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} />

        <input className="form-control mb-2" name="degree" placeholder="Degree" value={form.degree} onChange={handleChange} />

        <input className="form-control mb-2" name="from" placeholder="From Year" value={form.from} onChange={handleChange} />

        <input className="form-control mb-2" name="to" placeholder="To Year" value={form.to} onChange={handleChange} />

        <input className="form-control mb-2" name="percentage" placeholder="Percentage" value={form.percentage} onChange={handleChange} />

        <button className="btn btn-primary">{editId ? "Update" : "Add"}</button>
      </form>

      <hr className="my-5" />

 
      <h3>All Education</h3>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>College</th>
            <th>Degree</th>
            <th>From</th>
            <th>To</th>
            <th>Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {education.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No education found</td>
            </tr>
          ) : (
            education.map((item) => (
              <tr key={item._id}>
                <td>{item.collegeName}</td>
                <td>{item.degree}</td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>{item.percentage}</td>

                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

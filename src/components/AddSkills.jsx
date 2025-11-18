import { useEffect, useState } from "react";
import axios from "axios";

const AddSkills = () => {
  const [form, setForm] = useState({ name: "" });
  const [icon, setIcon] = useState(null);
  const [skills, setSkills] = useState([]);
  const [editId, setEditId] = useState(null);


  const fetchSkills = async () => {
    const res = await axios.get("https://portfolio-backend-ijsg.onrender.com/skills");
    setSkills(res.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    if (icon) data.append("icon", icon);

    try {
      if (editId) {
        await axios.put(`https://portfolio-backend-ijsg.onrender.com/skills/${editId}`, data);
        alert("Skill updated!");
      } else {
        await axios.post("https://portfolio-backend-ijsg.onrender.com/skills", data);
        alert("Skill added!");
      }

      setForm({ name: "" });
      setIcon(null);
      setEditId(null);
      fetchSkills();

    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`https://portfolio-backend-ijsg.onrender.com/skills/${id}`);
    fetchSkills();
  };


  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({ name: item.name });
  };


  return (
    <div className="container py-5">
      <h2>{editId ? "Update Skill" : "Add Skill"}</h2>

      <form onSubmit={handleSubmit} className="mt-4">

        <input
          type="text"
          name="name"
          placeholder="Skill Name"
          className="form-control mb-3"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setIcon(e.target.files[0])}
          accept="image/*"
        />

        <button className="btn btn-primary" type="submit">
          {editId ? "Update Skill" : "Add Skill"}
        </button>
      </form>

      <hr className="my-5" />


      <h3>All Skills</h3>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {skills.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No skills found</td>
            </tr>
          ) : (
            skills.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.icon ? (
                    <img
                      src={`https://portfolio-backend-ijsg.onrender.com/uploads/${item.icon}`}
                      alt=""
                      width="50"
                      height="50"
                    />
                  ) : "No Image"}
                </td>

                <td>{item.name}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
};

export default AddSkills;

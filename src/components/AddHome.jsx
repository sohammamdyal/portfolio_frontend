import React, { useEffect, useState } from "react";
import axios from "axios";

const AddHome = () => {
  const [data, setData] = useState({
    name: "",
    title: "",
    description: "",
    resumeUrl: "",
    imageUrl: "",
  });

  const [file, setFile] = useState(null);
  const [heroId, setHeroId] = useState(null);
  const [heroes, setHeroes] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);


  const fetchHeroes = async () => {
    try {
      const res = await axios.get("https://portfolio-backend-ijsg.onrender.com/hero");
      

      if (Array.isArray(res.data)) {
        setHeroes(res.data);
      }
  
  
      if (Array.isArray(res.data) && res.data.length > 0) {
        setData(res.data[0]);
        setHeroId(res.data[0]._id);
      }
  
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };
 
  useEffect(() => {
    fetchHeroes();
  }, []);
  


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("resumeUrl", data.resumeUrl);
    if (file) formData.append("image", file);

    try {
      const res = await axios.post("https://portfolio-backend-ijsg.onrender.com/hero", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Hero added successfully!");

      fetchHeroes();

      setData({ name: "", title: "", description: "", resumeUrl: "" });
      setFile(null);

    } catch (err) {
      console.log("Add error:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("resumeUrl", data.resumeUrl);
    if (file) formData.append("image", file);

    try {
      const res = await axios.put(
        `https://portfolio-backend-ijsg.onrender.com/hero/${heroId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Hero updated successfully!");

      fetchHeroes();

      setIsEditing(false);
      setData({ name: "", title: "", description: "", resumeUrl: "" });
      setFile(null);
      setHeroId(null);

    } catch (err) {
      console.log("Update error:", err);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`https://portfolio-backend-ijsg.onrender.com/hero/${id}`);

      alert("Hero deleted successfully!");

      fetchHeroes();

    } catch (err) {
      console.log("Delete error:", err);
    }
  };


  const editHero = (item) => {
    setData(item);
    setHeroId(item._id);
    setIsEditing(true);
  };

  return (
    <div className="container mt-4">
      <h2>{isEditing ? "Update Home Section" : "Add Home Section"}</h2>

      <form onSubmit={isEditing ? handleUpdate : handleAdd} encType="multipart/form-data">

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input 
            type="text"
            className="form-control"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

 
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input 
            type="text"
            className="form-control"
            name="title"
            value={data.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={data.description}
            onChange={handleChange}
          />
        </div>

       <div className="mb-3">
          <label className="form-label">Resume URL</label>
          <input
            type="text"
            className="form-control"
            name="resumeUrl"
            value={data.resumeUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Image</label>
          <input 
            type="file"
     
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>


        <button type="submit" className="btn btn-primary mt-3">
          {isEditing ? "Update" : "Add"}
        </button>
      </form>

      <hr className="my-5" />

      <h3 className="mb-3">All Hero Records</h3>

      <table className="table table-bordered mt-4">
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Title</th>
      <th>Description</th>
      <th>Resume</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {heroes.length === 0 ? (
      <tr>
        <td colSpan="6" className="text-center">No data found</td>
      </tr>
    ) : (
      heroes.map((item) => (
        <tr key={item._id}>
          <td>
          {item.imageUrl ? (
                    <img
                      src={`http://localhost:5000/uploads/${item.imageUrl}`}
                      alt=""
                      width="50"
                      height="50"
                    />
                  ) : "No Image"}
            
          </td>
          <td>{item.name}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>
            <a href={item.resumeUrl} target="_blank">View Resume</a>
          </td>
          <td>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => editHero(item)}
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

export default AddHome;

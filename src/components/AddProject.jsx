import { useEffect, useState } from "react";
import axios from "axios";

const AdminAddProject = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    image: null
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null); 

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("technologies", form.technologies);
    fd.append("liveUrl", form.liveUrl);
    fd.append("githubUrl", form.githubUrl);
    if (form.image) fd.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/projects/${editId}`, fd);
        alert("Project updated successfully!");
      } else {
        await axios.post("http://localhost:5000/projects", fd);
        alert("Project added successfully!");
      }

      fetchProjects();
      resetForm();

    } catch (err) {
      console.log("Submit error:", err);
    }
  };


  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      image: null
    });
    setEditId(null);
  };


  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      technologies: item.technologies,
      liveUrl: item.liveUrl,
      githubUrl: item.githubUrl,
      image: null
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await axios.delete(`http://localhost:5000/projects/${id}`);
      fetchProjects();
      alert("Project deleted!");
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{editId ? "Update Project" : "Add New Project"}</h2>

      <form onSubmit={handleSubmit}>

        <input type="text" name="title" placeholder="Project Title" className="form-control my-2" value={form.title} onChange={handleChange} required />

        <textarea name="description" placeholder="Description" className="form-control my-2" value={form.description} onChange={handleChange}></textarea>

        <input type="text" name="technologies" placeholder="Technologies (comma separated)" className="form-control my-2" value={form.technologies} onChange={handleChange} />

        <input type="text" name="liveUrl" placeholder="Live Demo URL" className="form-control my-2" value={form.liveUrl} onChange={handleChange} />

        <input type="text" name="githubUrl" placeholder="GitHub URL" className="form-control my-2" value={form.githubUrl} onChange={handleChange} />

        <input type="file" name="image" accept="image/*" className="form-control my-2" onChange={handleFile} />

        <button className="btn btn-primary mt-3">{editId ? "Update" : "Add"} Project</button>
      </form>

      <hr className="my-5" />

 
      <h3>All Projects</h3>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Technologies</th>
            <th>Live URL</th>
            <th>GitHub</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No projects found</td>
            </tr>
          ) : (
            projects.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.technologies}</td>
                <td><a href={item.liveUrl} target="_blank">Live</a></td>
                <td><a href={item.githubUrl} target="_blank">GitHub</a></td>
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
};

export default AdminAddProject;

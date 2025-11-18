import { useEffect, useState } from "react";
import axios from "axios";

const AdminAddAbout = () => {
  const [form, setForm] = useState({
    description: "",
    image: null
  });

  const [aboutId, setAboutId] = useState(null);


  useEffect(() => {
    const loadAbout = async () => {
      try {
        const res = await axios.get("http://localhost:5000/about");
        if (res.data) {
          setForm({
            description: res.data.description,
            image: res.data.image
          });
          setAboutId(res.data._id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadAbout();
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
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);

    try {
      if (aboutId) {
    
        await axios.put(`http://localhost:5000/about/${aboutId}`, fd);
        alert("About updated successfully!");
      } else {
     
        await axios.post("http://localhost:5000/about", fd);
        alert("About added successfully!");
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin – Add / Update About</h2>

      <form onSubmit={handleSubmit}>
        
        <textarea
          name="description"
          className="form-control my-3"
          placeholder="Write about yourself"
          value={form.description}
          onChange={handleChange}
          rows="5"
        ></textarea>

        <label>Upload Image</label>
        <input type="file" name="image" accept="image/*" className="form-control my-3" onChange={handleFile} />

        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default AdminAddAbout;

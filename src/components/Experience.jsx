import { useEffect, useState } from "react";
import axios from "axios";

const Experience = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const res = await axios.get("http://localhost:5000/experience");
        setExperience(res.data);
      } catch (err) {
        console.log("Error fetching experience:", err);
      }
    };
    fetchExp();
  }, []);

  return (
    <section className="container py-5" id="experience">
  <h2 className="fw-bold mb-4 text-center">Experience</h2>

  <div className="row">
    {experience.map((exp) => (
      <div key={exp._id} className="col-md-6 mb-4">
        <div className="card shadow-sm p-3 d-flex flex-row align-items-center">
  
          {exp.image && (
            <img
              src={`http://localhost:5000/uploads/${exp.image}`}
              alt={exp.role}
              className="me-3"
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }}
            />
          )}

          <div>
            <h4 className="fw-bold">{exp.role}</h4>
            <h6 className="text-muted">{exp.company}</h6>
            <p className="fw-semibold">{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

  );
};

export default Experience;

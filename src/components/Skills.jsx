import { useEffect, useState } from "react";
import axios from "axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await axios.get("http://localhost:5000/skills");
      setSkills(res.data);
    };
    fetchSkills();
  }, []);

  return (
    <section className="container py-5 text-center" id="skills">
      <h2 className="fw-bold mb-4">My Skills</h2>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="p-3 rounded-circle shadow-sm d-flex flex-column align-items-center justify-content-center"
            style={{
              width: "110px",
              height: "110px",
              background: "#f8f9fa",
              border: "1px solid #ddd",
            }}
          >
            {skill.icon && (
              <img
                src={`http://localhost:5000/uploads/${skill.icon}`}
                alt={skill.name}
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
            )}
            <p className="mt-2 fw-medium">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

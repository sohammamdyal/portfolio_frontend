import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EducationTimeline.css";

export default function EducationTimeline() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/education")
      .then(res => setEducation(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="timeline-container">
      <h2 className="text-center mb-4">Education</h2>

      <div className="timeline">
        {education.map((item, index) => (
          <div 
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`} 
            key={item._id}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div className="content">
              <h4>{item.degree}</h4>
              <h5>{item.collegeName}</h5>
              <p>{item.from} - {item.to}</p>
              <span className="badge bg-dark">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

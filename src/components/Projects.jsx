import { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://portfolio-backend-ijsg.onrender.com/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div></div>;

  return (
    <section className="text-center container" id="projects">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">My Projects</h1>
          <p className="lead text-body-secondary">
            Here are some of my projects.
          </p>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {projects.map((project) => (
          <div className="col" key={project._id}>
            <div className="card shadow-sm overflow-hidden">
              {project.imageUrl && (
                <img
                  src={`http://localhost:5000/uploads/${project.imageUrl}`}
                  className="card-img-top"
                  alt={project.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                <h4 className="text-start fw-bold">{project.title}</h4>
                <p className="card-text text-start">{project.description}</p>

                <div className="mb-3 d-flex flex-wrap gap-2">
                  {project.technologies?.map((tech, idx) => (
                    <span className="badge text-bg-secondary fw-light" key={idx}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="d-flex justify-content-end align-items-center">
                  <div className="btn-group">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={project.liveUrl}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Live Demo
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={project.githubUrl}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Code
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

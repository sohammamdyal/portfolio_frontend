import { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const res = await axios.get("https://portfolio-backend-ijsg.onrender.com/about");
        setAbout(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadAbout();
  }, []);

  if (!about) return <p>Loading...</p>;

  return (
    <section className="col-xxl-8 px-4 py-5" id="about">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">

        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src={`http://localhost:5000/uploads/${about.image}`}
            className="img-fluid"
            alt="About me"
          />
        </div>

        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            About Me
          </h1>
          <p className="lead">{about.description}</p>
        </div>

      </div>
    </section>
  );
};

export default About;

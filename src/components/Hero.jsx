import { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/hero");
  
        // If backend returns array, pick last item
        const latest = Array.isArray(res.data)
          ? res.data[res.data.length - 1]
          : res.data;
  
        setData(latest);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, []);
  // ⛔ Prevents: cannot read property 'name' of null
  if (!data) return <p>Loading...</p>;

  return (
    <section className="px-4 py-5 my-5 text-center">

      <img
        className="d-block mx-auto mb-4 shadow border"
        src={`http://localhost:5000/uploads/${data.imageUrl}`}
        alt={data.name || "Ankit Jha"}
        width={120}
        style={{ borderRadius: "50%" }}
      />

      <h1 className="display-5 fw-bold text-body-emphasis">
        Hello, I am {data.name || "Ankit Jha"}
      </h1>

      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          {data.description || data.title || "Description not available"}
        </p>

        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button className="btn btn-primary btn-lg px-4 gap-3">
            My Resume
          </button>

          <a href="#contact" className="btn btn-outline-secondary btn-lg px-4">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

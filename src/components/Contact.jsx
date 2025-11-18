import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post(
        "http://localhost:5000/contact",
        formData
      );

      if (response.status === 201) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.log("Error:", error);
      setStatus("Something went wrong. Try again!");
    } finally {
      setLoading(false);

      setTimeout(() => setStatus(""), 3000); // Clear status after 3 sec
    }
  };

  return (
    <section id="contact" className="px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            Contact Me
          </h1>
          <p className="col-lg-10 fs-4">
            Feel free to reach out with any questions, feedback, or
            opportunities.
          </p>
        </div>

        <div className="col-md-10 mx-auto col-lg-5">
          <form
            onSubmit={handleSubmit}
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
          >
            {status && <p className="text-success">{status}</p>}

            <div className="form-floating mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                id="nameInput"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="nameInput">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="emailInput"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="emailInput">Email</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                name="message"
                className="form-control"
                id="messageInput"
                placeholder="Your message"
                style={{ height: "150px" }}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <label htmlFor="messageInput">Message</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

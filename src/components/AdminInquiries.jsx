import { useEffect, useState } from "react";
import axios from "axios";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      const res = await axios.get("https://portfolio-backend-ijsg.onrender.com/contact");
      setInquiries(res.data);
    };

    fetchInquiries();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">All Inquiries</h2>

      {inquiries.length === 0 && <p>No inquiries yet.</p>}

      <div className="list-group">
        {inquiries.map((i) => (
          <div key={i._id} className="list-group-item p-4 shadow-sm mb-3">
            <h5>{i.name} <small className="text-muted">({i.email})</small></h5>
            <p>{i.message}</p>
            <small className="text-secondary">
              {new Date(i.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInquiries;

import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

const ShowContact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/contacts/${id}`);
        setContact(res.data);
      } catch (err) {
        console.error("Error fetching contact", err);
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/contacts/${id}`, contact);
      setStatus("Updated successfully!");
    } catch (err) {
      setStatus("Update failed!");
    }
  };

  if (!contact) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Edit Contact</h2>
        {status && <p className="text-green-500 text-center font-semibold">{status}</p>}
        <form onSubmit={handleUpdate} className="space-y-4">
          {["name", "phone", "email", "message"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="font-medium text-gray-700 capitalize">{field}:</label>
              {field === "message" ? (
                <textarea
                  name={field}
                  value={contact[field]}
                  onChange={handleChange}
                  rows={4}
                  className="border rounded-lg p-2 focus:ring focus:ring-blue-300"
                ></textarea>
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={contact[field]}
                  onChange={handleChange}
                  className="border rounded-lg p-2 focus:ring focus:ring-blue-300"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Update Contact
          </button>
        </form>
        <button
          onClick={() => navigate("/")}
          className="w-full py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ShowContact;

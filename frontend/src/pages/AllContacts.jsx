import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [sortKey, setSortKey] = useState("name");
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/contacts");
      if (Array.isArray(res.data)) setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error("Failed to delete contact", err);
    }
  };

  const handleSort = (key) => {
    setSortKey(key);
    const sorted = [...contacts].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    );
    setContacts(sorted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">All Contacts</h1>
          <button
            onClick={() => navigate("/new")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            + New Contact
          </button>
        </div>

        <div className="flex justify-end space-x-3">
          <span className="font-semibold text-gray-700">Sort by:</span>
          <button
            className={`px-3 py-1 rounded-lg ${sortKey === "name" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400 transition`}
            onClick={() => handleSort("name")}
          >
            Name
          </button>
          <button
            className={`px-3 py-1 rounded-lg ${sortKey === "phone" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400 transition`}
            onClick={() => handleSort("phone")}
          >
            Phone
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Phone</th>
                <th className="px-4 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((c) => (
                  <tr key={c._id} className="hover:bg-blue-50 transition">
                    <td
                      onClick={() => navigate(`/contact/${c._id}`)}
                      className="px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                    >
                      {c.name}
                    </td>
                    <td className="px-4 py-2">{c.phone}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => navigate(`/contact/${c._id}`)}
                        className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 transition"
                      >
                        View/Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllContacts;

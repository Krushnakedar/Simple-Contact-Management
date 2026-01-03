import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewContactForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => validateForm(), [form]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";

    const phonePattern = /^\+\d{1,3}\d{10}$/;
    if (!form.phone) newErrors.phone = "Phone is required";
    else if (!phonePattern.test(form.phone))
      newErrors.phone = "Phone must start with +countrycode and 10 digits";

    const emailPattern = /^[\w-.]+@gmail\.com$/;
    if (!form.email) newErrors.email = "Email is required";
    else if (!emailPattern.test(form.email))
      newErrors.email = "Email must be a Gmail address";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const res = await axios.post("https://simple-contact-management-2.onrender.com/api/contacts", form);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add contact");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Add New Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "phone", "email", "message"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="font-medium text-gray-700 capitalize">{field}:</label>
              {field === "message" ? (
                <textarea
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  rows={4}
                  className="border rounded-lg p-2 focus:ring focus:ring-blue-300"
                ></textarea>
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="border rounded-lg p-2 focus:ring focus:ring-blue-300"
                />
              )}
              {errors[field] && <span className="text-red-500 text-sm mt-1">{errors[field]}</span>}
            </div>
          ))}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              isValid ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewContactForm;

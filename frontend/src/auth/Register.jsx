import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple frontend validation
    if (!form.username || !form.email || !form.password) {
      alert("All fields are required.");
      return;
    }

    console.log("Submitting form:", form);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      console.log("Register response:", res.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      alert(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-32 space-y-4">
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Register
      </button>
    </form>
  );
};

export default Register;

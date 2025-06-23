import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value.trimStart() });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = form;

    if (!username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      console.log("Register response:", res.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      alert(
        err?.response?.data?.error ||
          "Registration failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-32 p-6 space-y-4 bg-white dark:bg-gray-800 shadow rounded"
    >
      <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-white">
        Register
      </h2>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white p-2 rounded`}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;

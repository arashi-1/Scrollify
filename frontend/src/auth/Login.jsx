import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value.trimStart() });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;
    if (!email || !password) {
      alert("Both email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      login(res.data.token, {
        username: res.data.username,
        id: res.data.userId,
      });

      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(
        err.response?.data?.error || "Login failed. Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-32 space-y-4 bg-white dark:bg-gray-800 p-6 shadow rounded"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">
        Login
      </h2>
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
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        } text-white p-2 rounded`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;

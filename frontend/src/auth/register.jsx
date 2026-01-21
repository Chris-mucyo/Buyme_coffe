import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/users/register";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    country: "Rwanda",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-sm border border-[#262626] bg-[#0b0b0b] p-8">
        <h1 className="text-xl font-semibold text-center mb-6">
          Create your  account
        </h1>

        {error && (
          <div className="border border-red-500/30 bg-red-500/10 text-red-400 p-2 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full name"
            onChange={handleChange}
            required
            className="w-full bg-[#0f0f0f] border border-[#262626] px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full bg-[#0f0f0f] border border-[#262626] px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full bg-[#0f0f0f] border border-[#262626] px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
          />

          <button
            disabled={loading}
            className="w-full bg-orange-500 text-black py-2 text-sm font-semibold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          By signing up, you agree to BuymeCoffee Terms & Privacy Policy
        </p>

        <div className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            className="text-orange-400 cursor-pointer hover:underline"
            onClick={() => navigate("/auth/login")}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}

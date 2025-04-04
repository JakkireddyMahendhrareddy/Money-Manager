import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth(); // You might want a `register()` function later
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(); // Auto-login after registration (for now)
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-80 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">Register</h2>
        <input
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="email"
          placeholder="Email"
          required
        />
        <input
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="password"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

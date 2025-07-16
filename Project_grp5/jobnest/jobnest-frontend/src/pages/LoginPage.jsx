import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const fromPath = location.state?.from;

  // 🔐 Check if user is already logged in and redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (token && user?.role) {
      navigate(user.role === "admin" ? "/admin" : "/user", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const isAdmin = email.trim().toLowerCase() === "admin@example.com";
    const userData = {
      name: isAdmin ? "Admin" : "Pawni",
      role: isAdmin ? "admin" : "user",
      token: "sample-token-123",
      id: isAdmin ? "A00123" : "U00192",
    };

    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("login"));

    setJustLoggedIn(true);

    // ⏳ Show confirmation briefly before redirecting
    setTimeout(() => {
      navigate(fromPath || `/${userData.role}`, { replace: true });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-800 relative text-white px-6">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-sm text-white hover:underline z-20"
      >
        ⬅ Back to Home
      </button>

      <form
        onSubmit={handleLogin}
        className="bg-white text-blue-900 p-8 rounded shadow w-full max-w-sm z-10"
      >
        <h2 className="text-xl font-bold mb-6 text-center">Login to JobNest</h2>

        {justLoggedIn && (
          <div className="mb-4 text-green-600 font-semibold text-center">
            ✅ Successfully logged in!
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Log In
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>

      {/* Decorative Circles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-orange-400 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500 rounded-full opacity-30 blur-2xl"></div>
      </div>
    </div>
  );
};

export default LoginPage;
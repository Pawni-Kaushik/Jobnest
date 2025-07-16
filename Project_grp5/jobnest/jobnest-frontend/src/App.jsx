import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✨ Pages
import LandingPage from "./pages/Landingpage";
import SearchResults from "./pages/SearchResults";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateCampaign from "./pages/CreateCampaign";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// 🧭 Global Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; // 🔐 Guarded routes

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* 🏠 Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-campaign"
          element={
            <ProtectedRoute>
              <CreateCampaign />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
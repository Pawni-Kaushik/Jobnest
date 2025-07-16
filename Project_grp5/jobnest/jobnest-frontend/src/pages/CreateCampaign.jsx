import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    stipend: "",
    skillsRequired: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      navigate("/login"); // redirect if not authenticated
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const missingFields = Object.entries(formData).filter(([_, val]) => !val.trim());
    if (missingFields.length > 0) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      setError("❌ You must be logged in to create a campaign.");
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      title: formData.title.trim().toLowerCase(),
      location: formData.location.trim().toLowerCase(),
      status: "Open",
      skillsRequired: formData.skillsRequired
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/campaign/create`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201 || res.status === 200) {
        setSuccess("🎉 Campaign created successfully!");
        setFormData({
          title: "",
          description: "",
          company: "",
          location: "",
          stipend: "",
          skillsRequired: "",
          deadline: "",
        });
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Submission failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Create a New Campaign</h1>

      {error && (
        <div className="text-red-600 bg-red-100 px-3 py-2 rounded mb-2">{error}</div>
      )}

      {success && (
        <div className="text-green-600 bg-green-100 px-3 py-2 rounded mb-2">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="stipend" placeholder="Stipend" value={formData.stipend} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="skillsRequired" placeholder="Skills (comma-separated)" value={formData.skillsRequired} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" rows={4} required />

        <button type="submit" disabled={loading} className={`w-full bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 transition"}`}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
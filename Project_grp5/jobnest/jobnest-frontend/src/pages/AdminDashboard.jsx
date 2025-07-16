import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    adminCount: 0,
    campaignCount: 0,
  });

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/campaigns");
        setCampaigns(res.data);
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
      }
    };

    fetchStats();
    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 text-blue-900">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      <div className="bg-white p-6 rounded shadow mb-8">
        <p className="text-lg">Welcome, recruiter!</p>
      </div>

      {/* 🚀 Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">👥 Users</h2>
          <p className="text-3xl font-bold">{stats.userCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">🧑‍💼 Admins</h2>
          <p className="text-3xl font-bold">{stats.adminCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">📢 Campaigns</h2>
          <p className="text-3xl font-bold">{stats.campaignCount}</p>
        </div>
      </div>

      {/* 📄 Campaign List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">🗂️ Campaigns Created</h2>
        {campaigns.length === 0 ? (
          <p className="text-gray-500">No campaigns found.</p>
        ) : (
          <ul className="space-y-4">
            {campaigns.map((campaign) => (
              <li key={campaign._id} className="border rounded p-4">
                <h3 className="text-lg font-semibold">{campaign.title}</h3>
                <p className="text-sm text-gray-700">📍 Location: {campaign.location}</p>
                <p className="text-sm text-gray-700">💰 Stipend: ₹{campaign.stipend}</p>
                <p className="text-sm text-gray-700">🕒 Deadline: {campaign.deadline}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
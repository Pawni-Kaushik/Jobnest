const User = require("../models/User"); // ✅ Adjusted filename casing
const Campaign = require("../models/campaignModel");

// 📊 Get statistics for dashboard
exports.getAdminStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: "user" });
    const adminCount = await User.countDocuments({ role: "admin" });
    const campaignCount = await Campaign.countDocuments();

    res.status(200).json({ userCount, adminCount, campaignCount });
  } catch (error) {
    console.error("❌ Error fetching admin stats:", error.message);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

// 📢 Get all campaigns for admin view
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("❌ Error fetching campaigns:", error.message);
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};
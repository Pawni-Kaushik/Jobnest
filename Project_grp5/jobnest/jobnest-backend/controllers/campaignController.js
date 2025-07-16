const Campaign = require("../models/campaignModel");

// 📝 Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const {
      title,
      location,
      stipend,
      deadline,
      description,
      skillsRequired,
      company,
      status,
      createdBy,
    } = req.body;

    const trimmedTitle = title?.trim().toLowerCase();
    const trimmedLocation = location?.trim().toLowerCase();
    const trimmedDescription = description?.trim();
    const trimmedCompany = company?.trim();

    if (
      !trimmedTitle ||
      !trimmedLocation ||
      !stipend ||
      !deadline ||
      !trimmedDescription ||
      !skillsRequired ||
      !trimmedCompany
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const processedSkills = Array.isArray(skillsRequired)
      ? skillsRequired
      : skillsRequired.split(",").map((skill) => skill.trim()).filter(Boolean);

    const newCampaign = new Campaign({
      title: trimmedTitle,
      location: trimmedLocation,
      stipend,
      deadline,
      description: trimmedDescription,
      company: trimmedCompany,
      skillsRequired: processedSkills,
      status: status?.trim() || "Open",
      createdBy: createdBy || req.user?.id,
    });

    const savedCampaign = await newCampaign.save();

    res.status(201).json({
      message: "✅ Campaign created successfully!",
      campaign: savedCampaign,
    });
  } catch (error) {
    console.error("🛑 Error creating campaign:", error.message);
    res.status(500).json({ message: "Failed to create campaign" });
  }
};

// 🔍 Search campaigns filtered by keyword and location
const searchCampaigns = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim().toLowerCase() || "";
    const location = req.query.location?.trim().toLowerCase() || "";

    const filters = {
      title: { $regex: keyword, $options: "i" },
      location: { $regex: location, $options: "i" },
      status: "Open",
    };

    const campaigns = await Campaign.find(filters).sort({ deadline: 1 });
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("🛑 Error fetching campaigns:", error.message);
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};

// 📋 Fetch all campaigns (admin/debug route)
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("🛑 Error fetching all campaigns:", error.message);
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};

module.exports = {
  createCampaign,
  searchCampaigns,
  getAllCampaigns,
};
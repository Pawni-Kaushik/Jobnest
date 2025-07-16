const express = require("express");
const router = express.Router();

const {
  createCampaign,
  searchCampaigns,
  getAllCampaigns,
} = require("../controllers/campaignController");

const { verifyToken } = require("../middleware/authMiddleware");

// 📝 Create a new campaign (logged-in only)
router.post("/create", verifyToken, createCampaign);

// 🔍 Search campaigns by keyword + location
router.get("/search", searchCampaigns);

// 📋 Fetch all campaigns (optional route for admin/debug)
router.get("/", getAllCampaigns);

module.exports = router;
const express = require("express");
const router = express.Router();
const { getAdminStats, getAllCampaigns } = require("../controllers/adminController");

// 📊 Dashboard stats route
router.get("/stats", getAdminStats);

// 📢 Campaigns list route
router.get("/campaigns", getAllCampaigns);

module.exports = router;
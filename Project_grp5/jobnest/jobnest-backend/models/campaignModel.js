const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  stipend: { type: String, required: true },
  deadline: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // for proper referencing
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Prevent OverwriteModelError during dev
module.exports = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);
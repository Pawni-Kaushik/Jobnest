import React from "react";

const CampaignList = ({ campaigns }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {campaigns.map((c) => (
        <div
          key={c._id}
          className="bg-white p-4 rounded shadow text-blue-900"
        >
          <h2 className="text-lg font-semibold">{c.title}</h2>
          <p>📍 {c.location}</p>
          <p>💰 {c.stipend}</p>
          <p>🗓 Deadline: {c.deadline}</p>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Query required" });

  try {
    const response = await axios.get(`https://saavn.dev/api/search/songs`, {
      params: { query },
    });

    res.json(response.data); // Will contain .data.results
  } catch (err) {
    console.error("Saavn API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch from JioSaavn" });
  }
});

module.exports = router;

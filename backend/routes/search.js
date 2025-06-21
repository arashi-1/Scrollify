const express = require("express");
const axios = require("axios");
const router = express.Router();

// Route: GET /api/search?q=<your query>
router.get("/", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Query required" });

  try {
    // Call Saavn API
    const response = await axios.get(`https://saavn.dev/api/search/songs`, {
      params: { query },
    });

    const tracks = response.data?.data?.results || [];
    res.json({ tracks });
  } catch (err) {
    console.error("Saavn search error:", err.message);
    res.status(500).json({ error: "Failed to fetch from JioSaavn" });
  }
});

module.exports = router;

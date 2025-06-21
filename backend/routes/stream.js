const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const songId = req.params.id;

  try {
    const info = await axios.get(`https://saavn.dev/api/songs/${songId}`);
    const song = info.data?.data?.[0];

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    const streamUrl = song.downloadUrl?.[4]?.url || song.downloadUrl?.[0]?.url;
    if (!streamUrl) {
      return res.status(404).json({ error: "Stream URL not found" });
    }

    // 👇 Support audio seeking by forwarding Range headers
    const audioResponse = await axios.get(streamUrl, {
      responseType: "stream",
      headers: {
        Range: req.headers.range || "bytes=0-",
        "User-Agent": "Mozilla/5.0",
        Referer: "https://www.jiosaavn.com/",
      },
    });

    // 👇 Forward all headers/status code
    res.writeHead(audioResponse.status, audioResponse.headers);
    audioResponse.data.pipe(res);
  } catch (err) {
    console.error("Stream error:", err.message);
    res.status(500).json({ error: "Failed to stream song" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const LikedSong = require("../models/LikedSong");
const authenticateToken = require("../middleware/authMiddleware");

// GET all liked songs for current user
router.get("/", authenticateToken, async (req, res) => {
  const songs = await LikedSong.find({ userId: req.user.userId });
  res.json(songs);
});

// POST a new liked song
router.post("/", authenticateToken, async (req, res) => {
  try {
    const song = req.body;

    // Enhance image quality if possible (replace lower resolution with 500x500 or better)
    const originalImage = song.image?.[2]?.link || song.image?.[0]?.url || "";
    const highResImage = originalImage.replace(
      /(\d{2,4})x(\d{2,4})/,
      "500x500"
    );

    const newSong = new LikedSong({
      id: song.id,
      title: song.name,
      artist: {
        name: song.primaryArtists || "Unknown",
      },
      album: {
        cover_medium: song.image?.[1]?.link || "",
        cover_high: song.image?.[2]?.link || song.image?.[0]?.url || "",
      },
      preview: song.downloadUrl?.[2]?.url || song.downloadUrl?.[0]?.url || "",
      userId: req.user.userId,
    });

    await newSong.save();
    res.status(201).json(newSong);
  } catch (err) {
    console.error("❌ Liked song save error:", err);
    res.status(500).json({ error: "Failed to save liked song" });
  }
});

// DELETE a liked song by ID
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const result = await LikedSong.deleteOne({
      id: req.params.id,
      userId: req.user.userId,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Song not found or already deleted" });
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("❌ Error deleting liked song:", err);
    res.status(500).json({ error: "Failed to delete liked song" });
  }
});

module.exports = router;

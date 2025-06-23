const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");
const authenticateToken = require("../middleware/authMiddleware");

// ✅ Get all playlists for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.userId });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

// ✅ Create a new playlist
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const newPlaylist = new Playlist({
      userId: req.user.userId,
      name,
      songs: [],
      isPublic: false,
    });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(500).json({ error: "Failed to create playlist" });
  }
});

// ✅ Add song to a playlist
router.post("/:playlistId/song", authenticateToken, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.playlistId,
      userId: req.user.userId,
    });
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    const song = {
      id: req.body.id,
      name: req.body.name,
      primaryArtists: req.body.primaryArtists,
      image: req.body.image, // ✅ make sure this exists
      downloadUrl: req.body.downloadUrl,
    };

    playlist.songs.push({
      id,
      title: name,
      artist: { name: primaryArtists },
      album: { cover_medium: image?.[2]?.link || image?.[0]?.url || "" },
      preview: downloadUrl?.[2]?.url || downloadUrl?.[0]?.url || "",
    });

    await playlist.save();
    res.json(playlist);
  } catch (err) {
    console.error("❌ Failed to add song to playlist:", err);
    res.status(500).json({ error: "Failed to add song to playlist" });
  }
});

// ✅ Get a specific playlist (only by owner)
router.get("/:playlistId", authenticateToken, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.playlistId,
      userId: req.user.userId,
    });
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
});

// ✅ Toggle visibility of a playlist (public/private)
router.patch("/:playlistId/visibility", authenticateToken, async (req, res) => {
  try {
    const { isPublic } = req.body;
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.playlistId, userId: req.user.userId },
      { isPublic },
      { new: true }
    );
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to update visibility" });
  }
});

// ✅ Get a public playlist by ID (no auth)
router.get("/public/:playlistId", async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.playlistId,
      isPublic: true,
    });
    if (!playlist)
      return res
        .status(404)
        .json({ error: "Playlist not public or doesn't exist" });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch shared playlist" });
  }
});

module.exports = router;

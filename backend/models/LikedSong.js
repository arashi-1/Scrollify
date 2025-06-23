const mongoose = require("mongoose");

const likedSongSchema = new mongoose.Schema({
  id: String, // Saavn song ID
  title: String,
  artist: {
    name: String,
  },
  album: {
    cover_medium: String,
    cover_high: String, // ✅ high-resolution cover
  },
  preview: String, // audio preview or download URL
  userId: String, // associated user ID
});

module.exports = mongoose.model("LikedSong", likedSongSchema);

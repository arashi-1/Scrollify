const mongoose = require("mongoose");

const likedSongSchema = new mongoose.Schema({
  id: Number,
  title: String,
  artist: {
    name: String,
  },
  album: {
    cover_medium: String,
  },
  preview: String,
  userId: String, // for multi-user support
});

module.exports = mongoose.model("LikedSong", likedSongSchema);

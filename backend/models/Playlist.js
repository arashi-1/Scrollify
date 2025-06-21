const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  songs: [
    {
      id: Number,
      title: String,
      artist: { name: String },
      album: { cover_medium: String },
      preview: String,
    },
  ],
});

module.exports = mongoose.model("Playlist", playlistSchema);

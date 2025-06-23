const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  songs: [
    {
      id: { type: String, required: true },
      title: String,
      name: String,
      primaryArtists: String,
      image: [
        {
          quality: String,
          url: String,
        },
      ],
      downloadUrl: [
        {
          quality: String,
          url: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Playlist", playlistSchema);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

const saavnRoutes = require("./routes/saavn");
const searchRoutes = require("./routes/search");
const streamRoutes = require("./routes/stream");
const likedSongRoutes = require("./routes/likedSongs");
const authRoutes = require("./routes/auth");
const playlistRoutes = require("./routes/playlist");

const app = express();

// ✅ CORS FIX for frontend audio streaming
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with frontend URL if different
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Route Setup
app.use("/api/saavn", saavnRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/liked", likedSongRoutes);

// ✅ Test Route
app.get("/", (req, res) => res.send("API is running"));

// ❌ Remove this old Deezer route if you’ve moved to JioSaavn
// app.get("/api/search", async (req, res) => { ... });

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // optional
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

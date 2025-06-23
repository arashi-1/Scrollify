import { useContext, useEffect, useState } from "react";
import { FaHeart, FaPlus } from "react-icons/fa";
import { getLikedSongs, likeSong, unlikeSong } from "../api/likedSongs";
import { getPlaylists, addToPlaylist } from "../api/playlists";
import { AuthContext } from "../context/AuthContext";

const MusicCard = ({ song }) => {
  const { token } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (token) {
      getLikedSongs().then((res) =>
        setLiked(res.data.some((s) => s.id === song.id))
      );
    }
  }, [song.id, token]);

  const toggleLike = async () => {
    if (!token) return alert("Login required");
    liked ? await unlikeSong(song.id) : await likeSong(song);
    setLiked(!liked);
  };

  const handleAddToPlaylist = async () => {
    if (!token) return alert("Login required");
    const res = await getPlaylists();
    setPlaylists(res.data);
    setShowDropdown((prev) => !prev);
  };

  const handleSelectPlaylist = async (playlistId) => {
    await addToPlaylist(playlistId, song);
    setShowDropdown(false);
    alert("Song added to playlist!");
  };

  // Utility: Upgrade image quality from 150x150 to 500x500 if possible
  const getHighResImage = (url) => {
    if (!url) return null;
    return url.replace(/(\d{2,4})x(\d{2,4})/, "500x500");
  };

  const fallbackImage =
    "https://cdn.pixabay.com/photo/2020/06/03/10/57/music-5253294_1280.jpg";
  const rawImage =
    song.image?.[2]?.link || song.image?.[0]?.url || song.album?.cover_medium;

  const cover = getHighResImage(rawImage) || fallbackImage;

  return (
    <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-lg p-4 mb-6 max-w-md w-full mx-auto">
      <img
        src={cover}
        alt={song.name}
        className="rounded-lg mb-3 w-full h-52 object-cover"
      />
      <h3 className="text-lg font-semibold">{song.name || "Unknown Title"}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {song.primaryArtists || song.artist?.name || "Unknown Artist"}
      </p>

      <audio controls className="w-full mt-3">
        <source
          src={`http://localhost:5000/api/stream/${song.id}`}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      <div className="absolute top-4 right-4 flex gap-3">
        <FaHeart
          onClick={toggleLike}
          className={`cursor-pointer text-xl ${
            liked ? "text-red-500" : "text-gray-400"
          }`}
        />
        <FaPlus
          onClick={handleAddToPlaylist}
          className="text-xl cursor-pointer text-blue-500"
        />
      </div>

      {showDropdown && (
        <div className="absolute right-4 top-12 bg-white dark:bg-gray-800 shadow-md rounded-lg z-50 w-48 p-2">
          {playlists.length === 0 ? (
            <p className="text-sm text-gray-500">No playlists found</p>
          ) : (
            playlists.map((pl) => (
              <button
                key={pl._id}
                onClick={() => handleSelectPlaylist(pl._id)}
                className="block w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded text-sm"
              >
                {pl.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MusicCard;

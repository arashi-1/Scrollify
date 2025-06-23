import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getPlaylistById, togglePlaylistVisibility } from "../api/playlists";
import MusicCard from "../components/MusicCard";

const ViewPlaylist = () => {
  const { playlistId } = useParams();
  const { user } = useContext(AuthContext);
  const [playlist, setPlaylist] = useState(null);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    getPlaylistById(playlistId).then((res) => setPlaylist(res.data));
  }, [playlistId]);

  const toggleVisibility = async () => {
    try {
      const updated = await togglePlaylistVisibility(
        playlist._id,
        !playlist.isPublic
      );
      setPlaylist(updated.data);
      if (updated.data.isPublic) {
        const base = window.location.origin;
        setShareUrl(`${base}/shared/${updated.data._id}`);
      } else {
        setShareUrl("");
      }
    } catch (err) {
      console.error("Failed to toggle visibility", err);
      alert("Could not change playlist visibility");
    }
  };

  if (!playlist)
    return <p className="mt-24 text-center">Loading playlist...</p>;

  return (
    <div className="ml-20 md:ml-24 mt-20 px-4">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
        {playlist.name}
      </h2>

      {user?.id === playlist.userId && (
        <button
          onClick={toggleVisibility}
          className="mb-2 bg-purple-600 text-white px-3 py-1 rounded"
        >
          {playlist.isPublic ? "Make Private" : "Make Public"}
        </button>
      )}

      {shareUrl && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Share this playlist:
          </p>
          <input
            readOnly
            value={shareUrl}
            className="w-full p-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
            onClick={(e) => e.target.select()}
          />
        </div>
      )}

      {playlist.songs.length === 0 ? (
        <p className="text-gray-500">No songs in this playlist.</p>
      ) : (
        playlist.songs.map((song, index) => (
          <MusicCard key={song.id || index} song={song} />
        ))
      )}
    </div>
  );
};

export default ViewPlaylist;

import { useEffect, useState } from "react";
import { getPlaylists } from "../api/playlists";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import { Link } from "react-router-dom";

const UserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPlaylists().then((res) => setPlaylists(res.data));
  }, []);

  const handleCreated = (newPlaylist) => {
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  return (
    <div className="ml-20 md:ml-24 mt-20 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Your Playlists
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          + New Playlist
        </button>
      </div>
      <div className="space-y-4">
        {playlists.map((p) => (
          <Link
            key={p._id}
            to={`/playlist/${p._id}`}
            className="block p-4 bg-white dark:bg-gray-800 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {p.name} ({p.songs.length} songs)
          </Link>
        ))}
      </div>
      {showModal && (
        <CreatePlaylistModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
};

export default UserPlaylists;

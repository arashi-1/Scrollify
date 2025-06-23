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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {playlists.map((p) => {
          const cover =
            p.songs?.[0]?.image?.[2]?.url || // from Saavn image format
            p.songs?.[0]?.album?.cover_medium || // from Deezer-like format
            "https://img.freepik.com/free-vector/music-notes-rainbow-colourful-with-vinyl-record-white-backgro_1308-90953.jpg"; // fallback

          return (
            <Link
              key={p._id}
              to={`/playlist/${p._id}`}
              className="block bg-white dark:bg-gray-800 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700 overflow-hidden"
            >
              <img
                src={cover}
                alt="Playlist cover"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-black dark:text-white">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-500">{p.songs.length} songs</p>
              </div>
            </Link>
          );
        })}
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

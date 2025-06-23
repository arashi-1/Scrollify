import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublicPlaylist } from "../api/playlists";
import MusicCard from "../components/MusicCard";

const SharedPlaylist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicPlaylist(playlistId)
      .then((res) => {
        setPlaylist(res.data);
        document.title = `${res.data.name} - Shared Playlist`; // Optional UX
      })
      .catch((err) => {
        console.error("Error loading shared playlist:", err);
        setPlaylist(null);
      })
      .finally(() => setLoading(false));
  }, [playlistId]);

  if (loading) {
    return <p className="mt-24 text-center">Loading shared playlist...</p>;
  }

  if (!playlist) {
    return (
      <p className="mt-24 text-center text-red-500">
        Playlist not found or is private.
      </p>
    );
  }

  return (
    <div className="ml-20 md:ml-24 mt-20 px-4">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
        {playlist.name} (Shared)
      </h2>

      {playlist.songs.length === 0 ? (
        <p className="text-gray-500">This shared playlist has no songs.</p>
      ) : (
        playlist.songs.map((song) => <MusicCard key={song.id} song={song} />)
      )}
    </div>
  );
};

export default SharedPlaylist;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublicPlaylist } from "../api/playlists";
import MusicCard from "../components/MusicCard";

const SharedPlaylist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    getPublicPlaylist(playlistId).then((res) => setPlaylist(res.data));
  }, [playlistId]);

  if (!playlist)
    return <p className="mt-24 text-center">Loading shared playlist...</p>;

  return (
    <div className="ml-20 md:ml-24 mt-20 px-4">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
        {playlist.name} (Shared)
      </h2>
      {playlist.songs.map((song) => (
        <MusicCard key={song.id} song={song} />
      ))}
    </div>
  );
};

export default SharedPlaylist;

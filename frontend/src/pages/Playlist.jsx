import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getLikedSongs } from "../api/likedSongs";
import MusicCard from "../components/MusicCard";

const Playlist = () => {
  const { user } = useContext(AuthContext);
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    if (user) {
      getLikedSongs().then((res) => {
        const fallbackImage =
          "https://cdn.pixabay.com/photo/2020/06/03/10/57/music-5253294_1280.jpg";

        const normalizedSongs = res.data.map((song) => {
          const imageLink =
            song.album?.cover_high || song.album?.cover_medium || fallbackImage;

          return {
            id: song.id,
            name: song.title || song.name || "Unknown Title",
            primaryArtists: song.artist?.name || "Unknown Artist",
            image: [
              { link: imageLink },
              { link: imageLink },
              { link: imageLink },
            ],
            downloadUrl: [
              { url: song.preview || "" },
              { url: song.preview || "" },
              { url: song.preview || "" },
            ],
          };
        });

        setLikedSongs(normalizedSongs);
      });
    }
  }, [user]);

  if (!user) {
    return (
      <p className="mt-24 text-center text-gray-600">
        Login to see your playlist
      </p>
    );
  }

  return (
    <div className="ml-20 md:ml-24 mt-20 px-4 overflow-y-auto h-[calc(100vh-5rem)]">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Your Liked Songs
      </h2>
      {likedSongs.length === 0 ? (
        <p className="text-gray-500">No liked songs yet.</p>
      ) : (
        likedSongs.map((song) => <MusicCard key={song.id} song={song} />)
      )}
    </div>
  );
};

export default Playlist;

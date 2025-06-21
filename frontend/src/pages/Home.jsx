import { useEffect, useState } from "react";
import MusicCard from "../components/MusicCard";
import Header from "../components/Header";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("lofi");
  const [error, setError] = useState(null);

  const fetchSongs = async (query) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/saavn/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      console.log("🎶 Saavn songs fetched:", data.data.results);
      setSongs(data.data.results || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch songs:", err);
      setError("Error fetching songs");
      setSongs([]);
    }
  };

  useEffect(() => {
    fetchSongs(query);
  }, []);

  return (
    <>
      <Header onSearch={fetchSongs} />
      <div className="ml-20 md:ml-24 mt-20 px-4 overflow-y-auto h-[calc(100vh-5rem)]">
        {error && <p className="text-red-500">{error}</p>}
        {songs.length === 0 && !error && (
          <p className="text-gray-400">No songs to display.</p>
        )}
        {songs.map((song) => (
          <MusicCard key={song.id} song={song} />
        ))}
      </div>
    </>
  );
};

export default Home;

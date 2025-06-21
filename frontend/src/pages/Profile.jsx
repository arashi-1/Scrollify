import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPlaylists } from "../api/playlists";
import { getLikedSongs } from "../api/likedSongs";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [playlistCount, setPlaylistCount] = useState(0);
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    getPlaylists().then((res) => setPlaylistCount(res.data.length));
    getLikedSongs().then((res) => setLikedCount(res.data.length));
  }, []);

  if (!user)
    return (
      <p className="mt-32 text-center text-gray-600">
        Please login to view your profile.
      </p>
    );

  return (
    <div className="ml-20 md:ml-24 mt-20 px-4 max-w-md">
      <div className="bg-white dark:bg-gray-900 shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Profile
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>User ID:</strong> {user.id}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Playlists:</strong> {playlistCount}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <strong>Liked Songs:</strong> {likedCount}
        </p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

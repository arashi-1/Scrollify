import { useState } from "react";
import { createPlaylist } from "../api/playlists";

const CreatePlaylistModal = ({ onClose, onCreated }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createPlaylist(name);
    onCreated(res.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded space-y-4 w-80"
      >
        <h2 className="text-lg font-bold">Create Playlist</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Playlist name"
          className="w-full p-2 border dark:bg-gray-700"
          required
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="text-sm">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylistModal;

import axios from "axios";

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const API = axios.create({ baseURL: "http://localhost:5000/api/playlist" });

export const createPlaylist = (name) => API.post("/", { name }, getHeaders());
export const getPlaylists = () => API.get("/", getHeaders());
export const addToPlaylist = (playlistId, song) =>
  API.post(`/${playlistId}/song`, song, getHeaders());
export const getPlaylistById = (playlistId) =>
  API.get(`/${playlistId}`, getHeaders());
export const togglePlaylistVisibility = (playlistId, isPublic) =>
  API.patch(`/${playlistId}/visibility`, { isPublic }, getHeaders());

export const getPublicPlaylist = (playlistId) =>
  axios.get(`http://localhost:5000/api/playlist/public/${playlistId}`);

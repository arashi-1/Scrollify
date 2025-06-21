import axios from "axios";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const API = axios.create({
  baseURL: "http://localhost:5000/api/liked",
});

export const getLikedSongs = () => API.get("/", getHeaders());
export const likeSong = (song) => API.post("/", song, getHeaders());
export const unlikeSong = (id) => API.delete(`/${id}`, getHeaders());

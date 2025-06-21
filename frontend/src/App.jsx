import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import UserPlaylists from "./pages/UserPlaylists";
import ViewPlaylist from "./pages/ViewPlaylist";
import Profile from "./pages/Profile";
import SharedPlaylist from "./pages/SharedPlaylist";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/my-playlists" element={<UserPlaylists />} />
            <Route path="/playlist/:playlistId" element={<ViewPlaylist />} />

            <Route path="/" element={<Home />} />
            <Route path="/playlist" element={<Playlist />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/shared/:playlistId" element={<SharedPlaylist />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

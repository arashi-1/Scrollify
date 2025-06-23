import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideUI =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex">
      {!hideUI && <Sidebar />}
      <div className="flex-1">
        {!hideUI && <Header />}
        {children}
      </div>
    </div>
  );
};

// Optional: simple private route wrapper
const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Login />;
};

function App() {
  return (
    <div className="flex-1 min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white">
      <Router>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shared/:playlistId" element={<SharedPlaylist />} />

            {/* Protected routes */}
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route
              path="/playlist"
              element={<PrivateRoute element={<Playlist />} />}
            />
            <Route
              path="/my-playlists"
              element={<PrivateRoute element={<UserPlaylists />} />}
            />
            <Route
              path="/playlist/:playlistId"
              element={<PrivateRoute element={<ViewPlaylist />} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

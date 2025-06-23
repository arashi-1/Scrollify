import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const dropdownRef = useRef(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Apply theme on mount
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-10 h-10 bg-gray-400 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 text-sm rounded shadow-lg py-2 z-50">
          <p
            className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={toggleTheme}
          >
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </p>
          <p
            className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

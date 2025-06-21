import { useState } from "react";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="relative">
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
          <p className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

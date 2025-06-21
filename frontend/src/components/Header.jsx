import { useState, useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { FaSearch } from "react-icons/fa";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (term = searchTerm) => {
    if (!term.trim()) return;
    onSearch(term);
    setShowDropdown(false);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // Sample autocomplete
    const sample = [
      "Lofi Chill",
      "Jazz Beats",
      "Focus Music",
      "Workout Mix",
      "Sleep Sounds",
    ];
    const filtered = sample.filter((s) =>
      s.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
    setShowDropdown(true);
  }, [searchTerm]);

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow fixed top-0 left-20 md:left-24 z-10">
      <div className="relative w-full max-w-md">
        <div className="flex items-center bg-white dark:bg-gray-700 border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search songs..."
            className="w-full bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
        </div>

        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute mt-1 w-full bg-white dark:bg-gray-700 border rounded-md shadow-lg z-20 max-h-48 overflow-y-auto">
            {suggestions.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectSuggestion(item)}
                className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-600 cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="ml-4">
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;

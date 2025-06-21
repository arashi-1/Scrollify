import { FaHome, FaHeart, FaMusic, FaBookmark, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-20 md:w-24 bg-gray-900 text-white h-screen flex flex-col items-center py-6 space-y-8 fixed left-0 top-0">
      <Link to="/">
        <FaHome className="text-2xl hover:text-blue-400 cursor-pointer" />
      </Link>
      <Link to="/playlist">
        <FaHeart className="text-2xl hover:text-red-400 cursor-pointer" />
      </Link>
      <FaMusic className="text-2xl hover:text-green-400 cursor-pointer" />
      <FaBookmark className="text-2xl hover:text-yellow-400 cursor-pointer" />
      <Link to="/profile">
        <FaUser
          className="text-2xl hover:text-indigo-400 cursor-pointer"
          title="Profile"
        />
      </Link>
    </div>
  );
};

export default Sidebar;

import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  FaHome,
  FaCompass,
  FaBell,
  FaBookmark,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import profile from "../../assets/images/profile.jpg";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="profile-card">
        <img
          src={
            user?.profileImage
              ? `http://localhost:5000/${user.profileImage}`
              : profile
          }
          alt="Profile"
        />

        <h3>{user?.name || "Guest User"}</h3>
        <p>{user?.email || "guest@example.com"}</p>
      </div>

      <nav className="menu">

        <NavLink to="/">
          <FaHome />
          <span>Home</span>
        </NavLink>

        <NavLink to="/search">
          <FaCompass />
          <span>Explore</span>
        </NavLink>

        <NavLink to="/messages">
          <FaMessage />
          <span>Messages</span>
        </NavLink>

        <NavLink to="/notifications">
          <FaBell />
          <span>Notifications</span>
        </NavLink>

        <NavLink to="/profile">
          <FaUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/edit-profile">
          <FaCog />
          <span>Edit Profile</span>
        </NavLink>

        <NavLink to="/saved">
          <FaBookmark />
          <span>Saved</span>
        </NavLink>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </nav>

      <button className="create-post-btn">
        <FaPlus />
        Create Post
      </button>

    </aside>
  );
}

export default Sidebar;
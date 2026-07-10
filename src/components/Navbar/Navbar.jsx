import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaHome, FaBell, FaEnvelope } from "react-icons/fa";

import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.jpg";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();
  return (
    <header className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        <img src={logo} alt="ConnectHub Logo" />
        <h2>ConnectHub</h2>
      </Link>

      {/* Search */}
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search users, posts..."
        />
      </div>

      {/* Navigation */}
      <div className="nav-icons">

        <NavLink to="/">
          <FaHome />
        </NavLink>

        <NavLink to="/notifications">
          <FaBell />
        </NavLink>

        <NavLink to="/messages">
          <FaEnvelope />
        </NavLink>

        <NavLink to="/profile" className="profile">
          <img
  src={
    user?.profileImage
      ? `http://localhost:5000/${user.profileImage}`
      : profile
  }
  alt={user?.name || "Profile"}
/>
        </NavLink>

      </div>

    </header>
  );
}

export default Navbar;
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

import cover from "../../assets/images/cover.jpg";
import defaultProfile from "../../assets/images/profile.jpg";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="profile-page">

        <Sidebar />

        <div className="profile-content">

          <img
            className="cover"
            src={cover}
            alt="Cover"
          />

          <img
            className="profile-image"
            src={
              user?.profileImage
                ? `http://localhost:5000${user.profileImage}`
                : defaultProfile
            }
            alt="Profile"
          />

          <h2>{user?.name}</h2>

          <p>{user?.email}</p>

          <p>{user?.bio}</p>

          <div className="profile-stats">

            <div>
              <h3>{user?.followers?.length || 0}</h3>
              <span>Followers</span>
            </div>

            <div>
              <h3>{user?.following?.length || 0}</h3>
              <span>Following</span>
            </div>

          </div>

          <button
            className="edit-btn"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>

        </div>

      </div>
    </>
  );
}

export default Profile;
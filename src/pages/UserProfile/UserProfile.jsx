// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import PostCard from "../../components/PostCard/PostCard";
// import api from "../../services/api";

// import "./UserProfile.css";
// import defaultProfile from "../../assets/images/profile.jpg";
// import defaultCover from "../../assets/images/cover.jpg";

// function UserProfile() {
//   const { id } = useParams();

//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);

//   const fetchProfile = async () => {
//     try {
//       const { data } = await api.get(`/auth/user/${id}`);

//       setUser(data.user);
//       setPosts(data.posts);

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, [id]);

//   const handleFollow = async () => {
//     try {
//       await api.put(`/auth/follow/${id}`);
//       fetchProfile();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!user) {
//     return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h2>;
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="profile-page">

//         <Sidebar />

//         <div className="profile-container">

//           <img
//             className="cover-image"
//             src={
//               user.coverImage
//                 ? `http://localhost:5000${user.coverImage}`
//                 : defaultCover
//             }
//             alt="Cover"
//           />

//           <img
//             className="profile-image"
//             src={
//               user.profileImage
//                 ? `http://localhost:5000${user.profileImage}`
//                 : defaultProfile
//             }
//             alt="Profile"
//           />

//           <h2>{user.name}</h2>

//           <p>{user.bio}</p>

//           <div className="stats">
//             <span>
//               <strong>{user.followers.length}</strong> Followers
//             </span>

//             <span>
//               <strong>{user.following.length}</strong> Following
//             </span>
//           </div>

//           <button
//             className="follow-btn"
//             onClick={handleFollow}
//           >
//             Follow / Unfollow
//           </button>

//           <h3>User Posts</h3>

//           {posts.length === 0 ? (
//             <p>No posts yet.</p>
//           ) : (
//             posts.map((post) => (
//               <PostCard
//                 key={post._id}
//                 post={post}
//                 fetchPosts={fetchProfile}
//               />
//             ))
//           )}

//         </div>

//       </div>
//     </>
//   );
// }

// export default UserProfile;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import PostCard from "../../components/PostCard/PostCard";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "./UserProfile.css";

import defaultProfile from "../../assets/images/profile.jpg";
import defaultCover from "../../assets/images/cover.jpg";

function UserProfile() {
  const { id } = useParams();
  const { user } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get(`/auth/user/${id}`);

      setProfileUser(data.user);
      setPosts(data.posts);

      if (user) {
        setFollowing(
          data.user.followers.includes(user._id)
        );
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleFollow = async () => {
    try {

      await api.put(`/follow/${id}`);

      fetchProfile();

    } catch (error) {
      console.error(error);
    }
  };

  if (!profileUser) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="profile-page">

        <Sidebar />

        <div className="profile-container">

          <img
            className="cover-image"
            src={
              profileUser.coverImage
                ? `http://localhost:5000${profileUser.coverImage}`
                : defaultCover
            }
            alt=""
          />

          <img
            className="profile-image"
            src={
              profileUser.profileImage
                ? `http://localhost:5000${profileUser.profileImage}`
                : defaultProfile
            }
            alt=""
          />

          <h2>{profileUser.name}</h2>

          <p>{profileUser.bio}</p>

          <div className="stats">

            <span>
              <strong>
                {profileUser.followers.length}
              </strong>
              <br />
              Followers
            </span>

            <span>
              <strong>
                {profileUser.following.length}
              </strong>
              <br />
              Following
            </span>

            <span>
              <strong>{posts.length}</strong>
              <br />
              Posts
            </span>

          </div>

          {user._id !== profileUser._id && (
            <button
              className="follow-btn"
              onClick={handleFollow}
            >
              {following ? "Unfollow" : "Follow"}
            </button>
          )}

          <hr />

          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              fetchPosts={fetchProfile}
            />
          ))}

        </div>

      </div>
    </>
  );
}

export default UserProfile;
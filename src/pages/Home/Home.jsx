// import "./Home.css";

// import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import RightSidebar from "../../components/RightSidebar/RightSidebar";
// import CreatePost from "../../components/CreatePost/CreatePost";
// import PostCard from "../../components/PostCard/PostCard";
// import Feed from "../../components/Feed/Feed";

// import profile from "../../assets/images/profile.jpg";
// import post1 from "../../assets/images/post1.jpg";

// function Home() {
//   return (
//     <>
//       <Navbar />

//       <div className="home-container">

//         <Sidebar />

//         <main className="feed">

//           <CreatePost />

//           <PostCard
//             user="Urvashi Sharma"
//             profile={profile}
//             image={post1}
//             caption="Excited to build my own MERN Social Media Platform 🚀"
//             time="2 min ago"
//           />

//         </main>

//         <RightSidebar />
//         <Feed />
//       </div>
//     </>
//   );
// }

// export default Home;

import { useEffect, useState } from "react";
import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";

import api from "../../services/api";

function Home() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/posts");
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="home-container">
        <Sidebar />

        <main className="feed">
          <CreatePost fetchPosts={fetchPosts} />

          {posts.length === 0 ? (
            <h3>No posts yet.</h3>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                fetchPosts={fetchPosts}
              />
            ))
          )}
        </main>

        <RightSidebar />
      </div>
    </>
  );
}

export default Home;
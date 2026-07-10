// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import api from "../../services/api";

// import "./Search.css";

// import defaultProfile from "../../assets/images/profile.jpg";

// function Search() {
//   const navigate = useNavigate();

//   const [keyword, setKeyword] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch users
//   const searchUsers = async () => {
//     try {
//       setLoading(true);

//       const { data } = await api.get(
//         `/auth/search?keyword=${keyword}`
//       );

//       setUsers(data.users);

//     } catch (error) {
//       console.error(error);

//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     searchUsers();
//   }, [keyword]);

//   return (
//     <>
//       <Navbar />

//       <div className="search-page">

//         <Sidebar />

//         <div className="search-content">

//           <h2>Search Users</h2>

//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//           />

//           {loading ? (
//             <h3>Searching...</h3>
//           ) : users.length === 0 ? (
//             <h3>No users found.</h3>
//           ) : (
//             <div className="users">

//               {users.map((user) => (
                
//                 <div
//                   key={user._id}
//                   className="user-card"
//                   onClick={() => navigate(`/profile/${user._id}`)}
//                 >

//                   <img
//                     src={
//                       user.profileImage
//                         ? `http://localhost:5000${user.profileImage}`
//                         : defaultProfile
//                     }
//                     alt={user.name}
//                   />

//                   <div className="user-info">

//                     <h3>{user.name}</h3>

//                     <p>{user.email}</p>

//                     {user.bio && (
//                       <small>{user.bio}</small>
//                     )}

//                   </div>

//                 </div>

//               ))}

//             </div>
//           )}

//         </div>

//       </div>
//     </>
//   );
// }

// export default Search;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../services/api";

import "./Search.css";

import defaultProfile from "../../assets/images/profile.jpg";

function Search() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  const searchUsers = async () => {

    try {

      const { data } = await api.get(
        `/auth/search?keyword=${keyword}`
      );

      setUsers(data.users);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    searchUsers();

  }, []);

  const followUser = async (id) => {

    try {

      await api.put(`/follow/${id}`);

      searchUsers();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      <div className="search-page">

        <Sidebar />

        <div className="search-container">

          <h2>Search Users</h2>

          <input
            type="text"
            placeholder="Search by name..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button onClick={searchUsers}>
            Search
          </button>

          <div className="users-list">

            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              users.map((u) => (

                <div
                  className="user-card"
                  key={u._id}
                >

                  <div
                    className="user-info"
                    onClick={() =>
                      navigate(`/profile/${u._id}`)
                    }
                  >

                    <img
                      src={
                        u.profileImage
                          ? `http://localhost:5000${u.profileImage}`
                          : defaultProfile
                      }
                      alt=""
                    />

                    <div>

                      <h3>{u.name}</h3>

                      <p>{u.email}</p>

                    </div>

                  </div>

                  <button
                    className="follow-btn"
                    onClick={() =>
                      followUser(u._id)
                    }
                  >
                    Follow
                  </button>

                </div>

              ))
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Search;
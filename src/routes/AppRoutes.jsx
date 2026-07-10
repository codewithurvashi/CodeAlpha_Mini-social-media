// import { Routes, Route } from "react-router-dom";

// import Home from "../pages/Home/Home";
// import Login from "../pages/Login/Login";
// import Signup from "../pages/Signup/Signup";
// import Profile from "../pages/Profile/Profile";
// import EditProfile from "../pages/EditProfile/EditProfile";
// import Search from "../pages/Search/Search";
// import Messages from "../pages/Messages/Messages";
// import Notifications from "../pages/Notifications/Notifications";
// import ProtectedRoute from "./ProtectedRoute";

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/edit-profile" element={<EditProfile />} />
//       <Route path="/search" element={<Search />} />
//       <Route path="/messages" element={<Messages />} />
//       <Route path="/notifications" element={<Notifications />} />
//     </Routes>
//   );
// }

// export default AppRoutes;

// import { Routes, Route } from "react-router-dom";

// import Home from "../pages/Home/Home";
// import Login from "../pages/Login/Login";
// import Signup from "../pages/Signup/Signup";
// import Profile from "../pages/Profile/Profile";
// import Search from "../pages/Search/Search";
// import Messages from "../pages/Messages/Messages";
// import Notifications from "../pages/Notifications/Notifications";
// import EditProfile from "../pages/EditProfile/EditProfile";

// import ProtectedRoute from "./ProtectedRoute";

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Protected Routes */}
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/search"
//         element={
//           <ProtectedRoute>
//             <Search />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/messages"
//         element={
//           <ProtectedRoute>
//             <Messages />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/notifications"
//         element={
//           <ProtectedRoute>
//             <Notifications />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/edit-profile"
//         element={
//           <ProtectedRoute>
//             <EditProfile />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default AppRoutes;
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Profile from "../pages/Profile/Profile";
import UserProfile from "../pages/UserProfile/UserProfile";
import Search from "../pages/Search/Search";
import Messages from "../pages/Messages/Messages";
import Notifications from "../pages/Notifications/Notifications";
import EditProfile from "../pages/EditProfile/EditProfile";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Logged-in user's own profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Other users' profiles */}
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
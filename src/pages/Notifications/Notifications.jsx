// import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";

// function Notifications() {
//   return (
//     <>
//       <Navbar />

//       <div className="profile-page">

//         <Sidebar />

//         <div className="notifications">

//           <h2>Notifications</h2>

//           <ul>

//             <li>❤️ Rahul liked your post.</li>

//             <li>💬 Priya commented on your post.</li>

//             <li>👤 Ananya started following you.</li>

//           </ul>

//         </div>

//       </div>
//     </>
//   );
// }

// export default Notifications;
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../services/api";

import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data.notifications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markRead = async (id) => {
    try {
      await api.put(`/notifications/${id}`);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getText = (type) => {
    switch (type) {
      case "like":
        return "liked your post ❤️";

      case "comment":
        return "commented on your post 💬";

      case "follow":
        return "started following you 👤";

      case "message":
        return "sent you a message 📩";

      default:
        return "sent a notification";
    }
  };

  return (
    <>
      <Navbar />

      <div className="notifications-page">

        <Sidebar />

        <div className="notifications-container">

          <h2>Notifications</h2>

          {notifications.length === 0 ? (
            <p>No notifications yet.</p>
          ) : (
            notifications.map((item) => (
              <div
                key={item._id}
                className={`notification ${
                  item.isRead ? "read" : "unread"
                }`}
                onClick={() => markRead(item._id)}
              >
                <img
                  src={
                    item.sender?.profileImage
                      ? `http://localhost:5000${item.sender.profileImage}`
                      : "/default-profile.png"
                  }
                  alt=""
                />

                <div>
                  <h4>{item.sender?.name}</h4>

                  <p>{getText(item.type)}</p>

                  <small>
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </small>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}

export default Notifications;
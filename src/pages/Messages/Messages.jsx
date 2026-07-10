// import { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import api from "../../services/api";

// import "./Messages.css";
// import socket from "../../socket";
// import { useAuth } from "../../context/AuthContext";

// function Messages() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   useEffect(() => {

//   if (user) {
//     socket.emit("join", user._id);
//   }

// }, [user]);
// useEffect(() => {

//   socket.on("receiveMessage", (message) => {

//     setMessages((prev) => [...prev, message]);

//   });

//   return () => socket.off("receiveMessage");

// }, []);
// useEffect(() => {

//   socket.on("onlineUsers", (users) => {

//     setOnlineUsers(users);

//   });

//   return () => socket.off("onlineUsers");

// }, []);
// useEffect(() => {

//   socket.on("typing", () => {

//     setTyping(true);

//     setTimeout(() => {

//       setTyping(false);

//     }, 1000);

//   });

//   return () => socket.off("typing");

// }, []);
//   // Load users
//   const fetchUsers = async () => {
//     try {
//       const { data } = await api.get("/auth/search");
//       setUsers(data.users);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Load chat
//   const fetchMessages = async (id) => {
//     try {
//       const { data } = await api.get(`/messages/${id}`);
//       setMessages(data.messages);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const selectUser = (user) => {
//     setSelectedUser(user);
//     fetchMessages(user._id);
//   };

//   const sendMessage = async () => {
//     if (!text.trim() || !selectedUser) return;

//     try {
//       await api.post("/messages", {
//         receiver: selectedUser._id,
//         message: text,
//       });

//       setText("");
//       fetchMessages(selectedUser._id);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="messages-page">

//         <Sidebar />

//         <div className="chat-container">

//           {/* Left */}

//           <div className="chat-users">

//             <h3>Chats</h3>

//             {users.map((user) => (
//               <div
//                 key={user._id}
//                 className="chat-user"
//                 onClick={() => selectUser(user)}
//               >
//                 <img
//                   src={
//                     user.profileImage
//                       ? `http://localhost:5000${user.profileImage}`
//                       : "/default-profile.png"
//                   }
//                   alt=""
//                 />

//                 <div>
//                   <h4>{user.name}</h4>
//                   <p>{user.email}</p>
//                 </div>
//               </div>
//             ))}

//           </div>

//           {/* Right */}

//           <div className="chat-box">

//             {!selectedUser ? (
//               <h2>Select a user to start chatting</h2>
//             ) : (
//               <>
//                 <h3>{selectedUser.name}</h3>

//                 <div className="messages">

//                   {messages.map((msg) => (
//                     <div
//                       key={msg._id}
//                       className={
//                         msg.sender._id === selectedUser._id
//                           ? "received"
//                           : "sent"
//                       }
//                     >
//                       {msg.message}
//                     </div>
//                   ))}

//                 </div>

//                 <div className="send-box">

//                   <input
//                     value={text}
//                     onChange={(e) =>
//                       setText(e.target.value)
//                     }
//                     placeholder="Type message..."
//                   />

//                   <button onClick={sendMessage}>
//                     Send
//                   </button>

//                 </div>
//               </>
//             )}

//           </div>

//         </div>

//       </div>
//     </>
//   );
// }

// export default Messages;
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../services/api";
import socket from "../../socket";
import { useAuth } from "../../context/AuthContext";

import "./Messages.css";

import defaultProfile from "../../assets/images/profile.jpg";

function Messages() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // ============================
  // Fetch all users
  // ============================

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/auth/search");
      setUsers(
        data.users.filter((u) => u._id !== user._id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ============================
  // Fetch Messages
  // ============================

  const fetchMessages = async (id) => {
    try {
      const { data } = await api.get(`/messages/${id}`);

      setMessages(data.messages);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    if (user) {

      fetchUsers();

      socket.emit("join", user._id);

    }

  }, [user]);

  // ============================
  // Listen Online Users
  // ============================

  useEffect(() => {

    socket.on("onlineUsers", (users) => {

      setOnlineUsers(users);

    });

    return () => socket.off("onlineUsers");

  }, []);

  // ============================
  // Receive Message
  // ============================

  useEffect(() => {

    socket.on("receiveMessage", (message) => {

      if (
        selectedUser &&
        (message.sender === selectedUser._id ||
          message.sender._id === selectedUser._id)
      ) {

        setMessages((prev) => [...prev, message]);

      }

    });

    return () => socket.off("receiveMessage");

  }, [selectedUser]);

  // ============================
  // Typing Indicator
  // ============================

  useEffect(() => {

    socket.on("typing", () => {

      setTyping(true);

      setTimeout(() => {

        setTyping(false);

      }, 1200);

    });

    return () => socket.off("typing");

  }, []);

  // ============================
  // Select User
  // ============================

  const selectUser = (u) => {

    setSelectedUser(u);

    fetchMessages(u._id);

  };

  // ============================
  // Send Message
  // ============================

  const sendMessage = async () => {

    if (!text.trim()) return;

    if (!selectedUser) return;

    try {

      await api.post("/messages", {

        receiver: selectedUser._id,

        message: text,

      });

      socket.emit("sendMessage", {

        sender: user._id,

        receiver: selectedUser._id,

        message: text,

      });

      setMessages((prev) => [

        ...prev,

        {

          sender: {

            _id: user._id,

            name: user.name,

          },

          receiver: {

            _id: selectedUser._id,

          },

          message: text,

        },

      ]);

      setText("");

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <>
      <Navbar />

      <div className="messages-page">

        <Sidebar />

        <div className="chat-container">

          {/* ================= USERS ================= */}

          <div className="chat-users">

            <h2>Messages</h2>

            {users.map((u) => (

              <div

                key={u._id}

                className={`chat-user ${
                  selectedUser?._id === u._id ? "active" : ""
                }`}

                onClick={() => selectUser(u)}

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

                  <h4>{u.name}</h4>

                  <p>{u.email}</p>

                  <small>

                    {onlineUsers.includes(u._id)
                      ? "🟢 Online"
                      : "⚪ Offline"}

                  </small>

                </div>

              </div>

            ))}

          </div>

          {/* ================= CHAT ================= */}

          <div className="chat-box">

            {!selectedUser ? (

              <div className="empty-chat">

                <h2>Select a user to start chatting</h2>

              </div>

            ) : (

              <>

                <div className="chat-header">

                  <img
                    src={
                      selectedUser.profileImage
                        ? `http://localhost:5000${selectedUser.profileImage}`
                        : defaultProfile
                    }
                    alt=""
                  />

                  <div>

                    <h3>{selectedUser.name}</h3>

                    <small>

                      {onlineUsers.includes(selectedUser._id)
                        ? "🟢 Online"
                        : "⚪ Offline"}

                    </small>

                  </div>

                </div>

                <div className="messages">

                  {messages.map((msg, index) => {

                    const senderId =
                      msg.sender?._id || msg.sender;

                    return (

                      <div

                        key={index}

                        className={
                          senderId === user._id
                            ? "sent"
                            : "received"
                        }

                      >

                        {msg.message}

                      </div>

                    );

                  })}

                </div>

                {typing && (

                  <div className="typing">

                    Typing...

                  </div>

                )}

                <div className="send-box">

                  <input

                    type="text"

                    placeholder="Type your message..."

                    value={text}

                    onChange={(e) => {

                      setText(e.target.value);

                      socket.emit("typing", {

                        sender: user._id,

                        receiver: selectedUser._id,

                      });

                    }}

                    onKeyDown={(e) => {

                      if (e.key === "Enter") {

                        sendMessage();

                      }

                    }}

                  />

                  <button onClick={sendMessage}>

                    Send

                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

    </>
  );
}

export default Messages;
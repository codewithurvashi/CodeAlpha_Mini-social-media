// import "./PostCard.css";
// import {
//   FaHeart,
//   FaRegComment,
//   FaShare,
//   FaTrash,
// } from "react-icons/fa";
// import api from "../../services/api";
// import { useAuth } from "../../context/AuthContext";
// import { useState } from "react";

// function PostCard({ post, fetchPosts }) {
//   const { user } = useAuth();
//   const [comment, setComment] = useState("");
//   const handleLike = async () => {
//     try {
//       await api.put(`/posts/like/${post._id}`);
//       fetchPosts();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await api.delete(`/posts/${post._id}`);
//       fetchPosts();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleComment = async () => {
//   if (!comment.trim()) return;

//   try {
//     await api.post(`/posts/comment/${post._id}`, {
//       text: comment,
//     });

//     setComment("");

//     fetchPosts();

//   } catch (error) {
//     console.error(error);
//   }
// };
//   return (
//     <div className="post-card">

//       <div className="post-header">

//         <div className="user-info">

//           <img
//             src={
//               post.author?.profileImage
//                 ? `http://localhost:5000${post.author.profileImage}`
//                 : "/default-profile.png"
//             }
//             alt=""
//           />

//           <div>

//             <h4>{post.author?.name}</h4>

//             <span>
//               {new Date(post.createdAt).toLocaleString()}
//             </span>

//           </div>

//         </div>

//         {user?._id === post.author?._id && (
//           <button
//             className="delete-btn"
//             onClick={handleDelete}
//           >
//             <FaTrash />
//           </button>
//         )}

//       </div>

//       <p>{post.content}</p>

//       {post.image && (
//         <img
//           className="post-image"
//           src={`http://localhost:5000${post.image}`}
//           alt=""
//         />
//       )}

//       <div className="post-actions">

//         <button onClick={handleLike}>
//           <FaHeart />
//           {post.likes.length}
//         </button>

//         <button>
//           <FaRegComment />
//           {post.comments.length}
//         </button>

//         <button>
//           <FaShare />
//           Share
//         </button>

//       </div>
//       <div classname="comments-section">
//         {post.comments.map((c, index) => (
//     <div
//         key={index}
//         className="comment"
//     >

//         <strong>
//             {c.user?.name}
//         </strong>

//         <p>
//             {c.text}
//         </p>

//     </div>
// ))}
//       <div className="comment-input">

//     <input
//         type="text"
//         placeholder="Write a comment..."
//         value={comment}
//         onChange={(e) =>
//             setComment(e.target.value)
//         }
//     />

//     <button
//         onClick={handleComment}
//     >
//         Send
//     </button>

// </div>
//       </div>

//     </div>
//   );
// }

// export default PostCard;

import "./PostCard.css";
import {
  FaHeart,
  FaRegComment,
  FaShare,
  FaTrash,
} from "react-icons/fa";

import { useState } from "react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import defaultProfile from "../../assets/images/profile.jpg";

function PostCard({ post, fetchPosts }) {
  const { user } = useAuth();

  const [comment, setComment] = useState("");

  const handleLike = async () => {
    try {
      await api.put(`/posts/like/${post._id}`);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${post._id}`);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      await api.post(`/posts/comment/${post._id}`, {
        text: comment,
      });

      setComment("");

      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-card">

      <div className="post-header">

        <div className="user-info">

          <img
            src={
              post.author?.profileImage
                ? `http://localhost:5000${post.author.profileImage}`
                : defaultProfile
            }
            alt="Profile"
          />

          <div>

            <h4>{post.author?.name}</h4>

            <span>
              {new Date(post.createdAt).toLocaleString()}
            </span>

          </div>

        </div>

        {user?._id === post.author?._id && (
          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        )}

      </div>

      <p>{post.content}</p>

      {post.image && (
        <img
          className="post-image"
          src={`http://localhost:5000${post.image}`}
          alt="Post"
        />
      )}

      <div className="post-actions">

        <button onClick={handleLike}>
          <FaHeart />
          {post.likes?.length || 0}
        </button>

        <button>
          <FaRegComment />
          {post.comments?.length || 0}
        </button>

        <button>
          <FaShare />
          Share
        </button>

      </div>

      <div className="comments-section">

        {(post.comments || []).map((c, index) => (
          <div
            key={index}
            className="comment"
          >
            <strong>
              {c.user?.name || "User"}
            </strong>

            <p>{c.text}</p>
          </div>
        ))}

        <div className="comment-input">

          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

          <button onClick={handleComment}>
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default PostCard;
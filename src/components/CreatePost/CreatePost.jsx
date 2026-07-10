import "./CreatePost.css";
import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import defaultProfile from "../../assets/images/profile.jpg";

function CreatePost({ fetchPosts }) {
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !image) {
      return alert("Please write something or select an image.");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setContent("");
      setImage(null);

      fetchPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">

      <div className="create-top">

        <img
          src={
            user?.profileImage
              ? `http://localhost:5000${user.profileImage}`
              : defaultProfile
          }
          alt="Profile"
        />

        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>

    </div>
  );
}

export default CreatePost;
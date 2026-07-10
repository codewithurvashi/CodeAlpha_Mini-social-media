import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function EditProfile() {

  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.location || "");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("location", location);

    if (image) {
      formData.append("profileImage", image);
    }

    try {
      await api.put("/auth/profile", formData);

      alert("Profile Updated Successfully");

    } catch (err) {

      alert("Error Updating Profile");

    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <textarea
        value={bio}
        onChange={(e)=>setBio(e.target.value)}
      />

      <input
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
      />

      <input
        type="file"
        onChange={(e)=>setImage(e.target.files[0])}
      />

      <button>
        Save
      </button>

    </form>
  );
}

export default EditProfile;
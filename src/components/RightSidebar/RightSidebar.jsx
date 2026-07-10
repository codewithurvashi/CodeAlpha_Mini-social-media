import "./RightSidebar.css";

import profile2 from "../../assets/images/profile2.jpg";
import profile3 from "../../assets/images/profile3.jpg";
import profile4 from "../../assets/images/profile4.jpg";

function RightSidebar() {
  return (
    <aside className="right-sidebar">

      {/* Trending */}

      <div className="card">

        <h3>🔥 Trending</h3>

        <div className="trend">
          <h4>#ReactJS</h4>
          <p>15.2K Posts</p>
        </div>

        <div className="trend">
          <h4>#MERN</h4>
          <p>10.4K Posts</p>
        </div>

        <div className="trend">
          <h4>#JavaScript</h4>
          <p>9.1K Posts</p>
        </div>

      </div>

      {/* Suggested Friends */}

      <div className="card">

        <h3>👥 Suggested Friends</h3>

        <Friend
          image={profile2}
          name="Priya Sharma"
          role="UI Designer"
        />

        <Friend
          image={profile3}
          name="Rahul Verma"
          role="Backend Developer"
        />

        <Friend
          image={profile4}
          name="Ananya Gupta"
          role="Software Engineer"
        />

      </div>

      {/* Activity */}

      <div className="card">

        <h3>📈 Recent Activity</h3>

        <ul>

          <li>❤️ You liked Rahul's post</li>

          <li>💬 Priya commented on your post</li>

          <li>👤 Ananya followed you</li>

        </ul>

      </div>

    </aside>
  );
}

function Friend({ image, name, role }) {
  return (
    <div className="friend">

      <img src={image} alt={name} />

      <div>

        <h4>{name}</h4>

        <p>{role}</p>

      </div>

      <button>Follow</button>

    </div>
  );
}

export default RightSidebar;
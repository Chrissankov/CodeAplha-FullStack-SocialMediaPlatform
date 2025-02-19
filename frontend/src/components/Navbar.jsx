import { useState } from "react";
import "../styles/Navbar.css";
import postifyLogo from "../assets/postify-logo.png";
import defaultAvatar from "../assets/default-avatar.png";

function Navbar({ onLogout, username, followers, following, profileImage }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-title-img">
        <h1>Postify</h1>
        <img className="logo" alt="Postify Logo" src={postifyLogo} />
      </div>
      <div className="nav-actions">
        <button className="profile-btn" onClick={toggleProfile}>
          Profile
        </button>
        {isProfileOpen && (
          <div className="profile-info">
            <img
              className="profile-img"
              alt="Profile"
              src={profileImage || defaultAvatar}
            />
            <p className="profile-username">{username}</p>
            <p className="profile-followers">
              <strong>Followers:</strong> {followers}
            </p>
            <p className="profile-following">
              <strong>Following:</strong> {following}
            </p>
          </div>
        )}
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

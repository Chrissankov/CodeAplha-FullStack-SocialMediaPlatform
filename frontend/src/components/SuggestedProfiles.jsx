import { useState } from "react";
import "../styles/SuggestedProfiles.css";

function SuggestedProfiles() {
  const suggestedUsers = [
    {
      id: 1,
      username: "alex_99",
      profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 2,
      username: "emily_watson",
      profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 3,
      username: "john_doe",
      profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 4,
      username: "sarah_connor",
      profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 5,
      username: "mike_tyson",
      profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ];

  // State to track follow status for each user
  const [followStates, setFollowStates] = useState(
    suggestedUsers.reduce((acc, user) => {
      acc[user.id] = false; // Initially set to not followed
      return acc;
    }, {})
  );

  // Toggle follow/unfollow when button is clicked
  const toggleFollow = (userId) => {
    setFollowStates((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId], // Toggle the follow state
    }));
  };

  return (
    <div className="suggested-container">
      <h3>Suggested for You</h3>
      <div className="suggested-users-wrapper">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="suggested-user">
            <img
              src={user.profileImg}
              alt={user.username}
              className="profile-img"
            />
            <span className="username">{user.username}</span>
            <button
              className={`follow-btn ${
                followStates[user.id] ? "following" : ""
              }`}
              onClick={() => toggleFollow(user.id)}
            >
              {followStates[user.id] ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedProfiles;

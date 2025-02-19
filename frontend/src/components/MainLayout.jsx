import Navbar from "./Navbar";
import Posts from "./Posts";
import SuggestedProfiles from "./SuggestedProfiles";
import "../styles/MainLayout.css";

function MainLayout({ onLogout }) {
  return (
    <div className="main-lout">
      <Navbar onLogout={onLogout} />
      <div className="content">
        <Posts />
        <SuggestedProfiles />
      </div>
    </div>
  );
}

export default MainLayout;

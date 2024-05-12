import React from "react";
import "./home.styles.css";
import Search from "../../components/search/search.component";
import Conversations from "../../components/coversations/conversations.component";
import { MdOutlineLogout } from "react-icons/md";
import Messages from "../../components/messages/messages.component";
import useLogout from "../../hooks/useLogout";
import Loader from "../../components/loader/loader.component";

const Home = () => {
  const { loading, logout } = useLogout();
  const handleLogout = async (e) => {
    await logout();
  };
  return (
    <div className="box">
      <div className="home-wrapper">
        <div className="left-side-conversations">
          <Search />
          <div className="divider"></div>
          <Conversations />
          {loading ? (
            <Loader />
          ) : (
            <MdOutlineLogout onClick={handleLogout} className="logout-icon" />
          )}
        </div>

        <div className="right-side-messages">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./search.styles.css";
import { useDispatch, useSelector } from "react-redux";
import useGetConversations from "../../hooks/useGetConversations";
import { setSelectedConversation } from "../../../store/conversation/conversation.reducer";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const { conversations } = useGetConversations();
  const dispatch = useDispatch();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Search term must be atleast 3 characters long");
      return;
    }

    const conversation = conversations.find((convo) =>
      convo.name.toLowerCase().includes(search.toLowerCase())
    );

    if (!conversation) {
      toast.error("No user found");
      return;
    }

    dispatch(setSelectedConversation(conversation));
    setSearch("");
  };
  return (
    <div>
      <form className="search-contacts" onSubmit={handleSearchSubmit}>
        <input
          className="search-field"
          type="text"
          placeholder="Search.."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="search-icon-wrapper">
          <button type="submit" className="search-icon-btn">
            <FaSearch type="submit" className="search-icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;

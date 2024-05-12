import React from "react";
import "./contact.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { selectedConversation } from "../../../store/conversation/conversation.selector";
import { setSelectedConversation } from ".././../../store/conversation/conversation.reducer";
import { useSocketContext } from "../../contexts/socketContext";

const Contact = ({ contact, lastContact }) => {
  const selectedCurrentConversation = useSelector(selectedConversation);
  const dispatch = useDispatch();
  const { _id, name, avatar } = contact;
  const isSelected = selectedCurrentConversation?._id === _id;

  // implementing the onlineUsers feature
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(contact._id);

  const handleOnContactSelected = () => {
    dispatch(setSelectedConversation(contact));
  };

  return (
    <div
      onClick={handleOnContactSelected}
      className={`contact-wrapper ${isSelected ? "selected-contact" : ""}`}
    >
      <div className="contact-header">
        <div className={`${isOnline ? "online-status": ""}`} />
        <img src={avatar} alt={name} />
        <h4 className="contact-name">{name}</h4>
      </div>
      {!lastContact && <div className="contacts-divider"></div>}
    </div>
  );
};

export default Contact;

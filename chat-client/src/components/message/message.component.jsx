import React from "react";
import "./message.styles.css";
import { extracttime } from "../../utils/fomatTime";

const Message = ({ byMe, message, profilePic }) => {
  const formattedTime = extracttime(message.createdAt);
  return (
    <div className={`individual-message ${byMe ? "right" : ""}`}>
      <div className="chat-content">
        {!byMe && <img src={profilePic} />}
        <div className={`chat-bubble ${byMe ? "right" : ""}`}>
          {message.message}
        </div>
        {byMe && <img src={profilePic} />}
      </div>
      <div className={`chat-time ${!byMe ? "right" : ""}`}>{formattedTime}</div>
    </div>
  );
};

export default Message;

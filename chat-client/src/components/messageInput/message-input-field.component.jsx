import React, { useState } from "react";
import "./message-input-field.styles.css";
import { IoIosSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";
import Loader from "../loader/loader.component";

const MessageInputField = () => {
  const { loading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div className="message-input-block">
        <textarea
          className="message-input-field"
          type="text"
          rows="1"
          placeholder="Send a message.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="send-message-btn">
          {loading ? <Loader /> : <IoIosSend className="send-message-icon" />}
        </button>
      </div>
    </form>
  );
};

export default MessageInputField;

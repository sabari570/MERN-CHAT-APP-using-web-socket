import React, { useEffect, useRef } from "react";
import "./messages.styles.css";
import Message from "../message/message.component";
import MessageInputField from "../messageInput/message-input-field.component";
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { selectedConversation } from "../../../store/conversation/conversation.selector";
import { setSelectedConversation } from "../../../store/conversation/conversation.reducer";
import { selectCurrentUser } from "../../../store/user/user.selector";
import useGetMessages from "../../hooks/useGetMessages";
import Loader from "../loader/loader.component";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const selectedCurrentConversation = useSelector(selectedConversation);
  const currentUser = useSelector(selectCurrentUser);
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const dispatch = useDispatch();

  // we create a useRef for automatically scroll to the last message sent
  const lastMessageRef = useRef();

  useEffect(() => {
    // this is how we unmount, this section of code gets executed when this component is not in view
    return () => {
      dispatch(setSelectedConversation(null));
    };
  }, [setSelectedConversation]);

  // this useEffect is written to automaticallly scroll to the lastmessage
  // using the useRef, we pass the lastMessageRef along with each message inorder to track which is the last message
  useEffect(() => {
    // we use here setTimeout because sometimes the automatic scrolling doesn't work beacause of the rendering time
    // so using the setTimeout is the only solution for it
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]); // run this useEffect whenever the messages changes

  return !selectedCurrentConversation ? (
    <NoChatSelected />
  ) : (
    <div className="messages-box">
      <div className="message-chat-header">
        <p className="to-styling">To:</p>
        <p className="chat-name">{selectedCurrentConversation?.name}</p>
      </div>

      <div className="messages-list">
        {loading && (
          <div className="center-loader">
            {" "}
            <Loader />
          </div>
        )}
        {!loading && messages.length === 0 && (
          <div className="initiate-convo-message">
            Send a message to start a conversation...
          </div>
        )}
        {!loading &&
          messages.length > 0 &&
          messages.map((message) => {
            const byMe = message.senderId === currentUser.id;
            const profilePic = byMe
              ? currentUser.avatar
              : selectedCurrentConversation.avatar;
            return (
              // we pass the ref along with each message so it will be easier to locate the lastmessage
              <div key={message._id} ref={lastMessageRef}>
                <Message
                  message={message}
                  byMe={byMe}
                  profilePic={profilePic}
                />
              </div>
            );
          })}
      </div>

      <MessageInputField />
    </div>
  );
};

export default Messages;

const NoChatSelected = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="empty-chats">
      <div className="empty-chats-wrapper">
        <p>Welcome 👋 {currentUser?.name}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="empty-chats-icon" />
      </div>
    </div>
  );
};

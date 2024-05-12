import React from "react";
import Contact from "../contact/contact.component";
import "./conversations.styles.css";
import useGetConversations from "../../hooks/useGetConversations";
import Loader from "../loader/loader.component";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="conversations">
      {loading ? (
        <div className="conversation-loader-position">
          <Loader />
        </div>
      ) : (
        conversations.map((conversation, idx) => {
          const lastItem = idx === conversations.length - 1;
          return (
            <Contact
              key={conversation._id}
              contact={conversation}
              lastContact={lastItem}
            />
          );
        })
      )}
    </div>
  );
};

export default Conversations;

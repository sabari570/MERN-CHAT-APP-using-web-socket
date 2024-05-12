import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedConversation,
  selectedMessages,
} from "../../store/conversation/conversation.selector";
import { setMessages } from "../../store/conversation/conversation.reducer";
import toast from "react-hot-toast";
import axios from "axios";
import { URL_CONFIG } from "../utils/constants";
import { selectCurrentUser } from "../../store/user/user.selector";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const currentConversationSelected = useSelector(selectedConversation);
  const messages = useSelector(selectedMessages);
  const dispatch = useDispatch();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${URL_CONFIG.CHAT_APP_BASE_URL}/message/send/${currentConversationSelected._id}`,
        { message },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser.accessToken}` },
        }
      );
      console.log("response after sending message: ", response.data);
      if (response.status == 201) {
        dispatch(setMessages([...messages, response.data.message]));
      }
    } catch (error) {
      console.log("Error while sending message: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
}

export default useSendMessage;

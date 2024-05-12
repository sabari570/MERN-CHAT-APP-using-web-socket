import React, { useEffect, useState } from "react";
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

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const messages = useSelector(selectedMessages);
  const currentConversationSelected = useSelector(selectedConversation);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  //   We use useEffect in custom hooks when we actually want to fetch something when this component get initialised
  useEffect(() => {
    const getMesasges = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${URL_CONFIG.CHAT_APP_BASE_URL}/message/${currentConversationSelected?._id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${currentUser?.accessToken}` },
          }
        );
        dispatch(setMessages(response.data.messages));
      } catch (error) {
        console.log("Error while fetching messages: ", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (currentConversationSelected?._id) getMesasges();
  }, [currentConversationSelected?._id]); // run this useEffect whenever the selected conversation changes

  return { loading, messages };
};

export default useGetMessages;

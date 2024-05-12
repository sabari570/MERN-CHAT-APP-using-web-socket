import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { URL_CONFIG } from "../utils/constants";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

function useGetConversations() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${URL_CONFIG.CHAT_APP_BASE_URL}/users/`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${currentUser.accessToken}` },
          }
        );
        setConversations(response.data.users);
      } catch (error) {
        console.log("Error while fetching conversations: ", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
}

export default useGetConversations;

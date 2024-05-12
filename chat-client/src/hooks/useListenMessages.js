import React, { useEffect } from "react";
import { useSocketContext } from "../contexts/socketContext";
import { useDispatch, useSelector } from "react-redux";
import { selectedMessages } from "../../store/conversation/conversation.selector";
import { setMessages } from "../../store/conversation/conversation.reducer";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const messages = useSelector(selectedMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log("New message received: ", newMessage);
      dispatch(setMessages([...messages, newMessage]));
    });

    // when this component unmounts we stop listening to this event
    // if we dont do this then it will continously listen to these events that are emitted from all the connected users
    // which will cause a problem
    return () => socket?.off("newMessage");
  }, [socket, messages]);
};

export default useListenMessages;

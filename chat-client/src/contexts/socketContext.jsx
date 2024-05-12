import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

// webs socket package for client
import io from "socket.io-client";

const SocketContext = createContext();

// custom hook to use the SocketContextProvider in any other files
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser) {
      const socket = io(
        "https://chat-app-production-wiuc.onrender.com",
        // once the user is logged in and get connected to the web socket we pass the users id to the socket
        //  inorder to add the user to the userSocketMap in the backend, this is how we send data in web socket
        {
          query: {
            userId: currentUser.id,
          },
        }
      );
      setSocket(socket);

      // socket.on() is used to listen to events emitted by the web sockets
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        // close the socket connection if not user is logged in
        socket.close();
        setSocket(null);
      }
    }
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

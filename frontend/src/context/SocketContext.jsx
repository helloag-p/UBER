import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";
export const SocketContext = createContext();
const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"], // 🔥 disables polling
  withCredentials: true,
});
const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });
    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });
  }, []);

  return (
    <div>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </div>
  );
};

export default SocketProvider;
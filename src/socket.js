import { io } from "socket.io-client";

const socket = io("https://chat-be-8ujr.onrender.com", {
  transports: ["websocket"], // Forces the use of WebSockets
  withCredentials: true,
});

// const socket = io("http://localhost:4000/", {
//   transports: ["websocket"], // Forces the use of WebSockets
//   withCredentials: true,
// });

socket.on("connect", () => {
  console.log("Socket connected with ID:", socket.id);
});

export default socket;

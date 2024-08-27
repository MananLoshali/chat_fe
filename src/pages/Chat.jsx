import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getPrivateRequest } from "../api";
import { MyContext } from "../contexts/myContexts";
import socket from "../socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Chat = () => {
  const { id: receiverId } = useParams(); // ID of the person who receives the message
  // const user = JSON.parse(localStorage.getItem("user"));
  // const { _id: id } = user.user; // ID of the person who sends the message
  const currentUser = useSelector((state) => state.user);
  const id = currentUser?.user?.id;
  const selectedChat = currentUser?.selectedChat;

  const [msg, setMsg] = useState("");
  const { sender } = useContext(MyContext);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
      }
    };
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const privateRequest = getPrivateRequest();
        const res = await privateRequest.post(`/chats/get-chats/${id}`, {
          user: id,
          receiver: receiverId,
        });

        if (res.data.success) {
          setMessages(res.data.chat);
        }
      } catch (error) {
        const msg = error.message;
        toast.error(msg);
      }
    };
    getChats();

    // Join the room based on the sender's ID
    socket.emit("join", id);

    // Attach the event listener for receiving messages
    const handleReceiveMessage = (messageData) => {
      const audio = new Audio(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav"
      );
      audio.play();
      setMessages((prev) => [...prev, messageData]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    // Clean up the event listener when the component unmounts or dependencies change
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [id, receiverId]);

  const handleClick = async () => {
    try {
      const privateRequest = getPrivateRequest();
      const res = await privateRequest.post(`/chats/${id}`, {
        sender: id,
        receiver: receiverId,
        message: msg,
      });
      setMsg("");
    } catch (error) {
      const msg = error.message;
      toast.error(msg);
    }
  };
  return (
    <div
      className="relative w-full h-[90vh] box-border bg-gray-50"
      id="chat-section"
    >
      <h1 className="text-3xl text-blue-600 font-semibold mb-5 border-b border-gray-300 p-4 shadow">
        {selectedChat}
      </h1>
      <div
        ref={messageEndRef}
        className="flex flex-col gap-3 h-[65vh] overflow-y-auto mb-5 p-4"
      >
        {messages?.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 p-3 mb-4 w-max max-w-[75%] min-w-32  ${
              item.sender === id
                ? "self-end bg-blue-500 text-white rounded-t-lg rounded-br-lg rounded-bl-none shadow-md"
                : "self-start bg-gray-300 text-black rounded-t-lg rounded-bl-lg rounded-br-none shadow-md"
            }`}
          >
            <p className="text-xs text-red-900">
              {item.sender === id ? "You" : "Other"}
            </p>
            <p className="text-base break-words">{item.message}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full bg-[#f0f2f5] flex items-center p-4 shadow-md">
        <div className="relative flex items-center w-full box-border h-12 rounded-lg border border-gray-300 p-2 pr-16 bg-gray-100">
          <input
            value={msg}
            type="text"
            placeholder="Type a message..."
            onChange={(e) => setMsg(e.target.value)}
            className="w-full h-full p-2 border-none bg-transparent focus:outline-none focus:ring-0 text-gray-700"
          />
          <button
            onClick={handleClick}
            className="absolute right-3 w-20 h-8 text-white font-medium bg-purple-500 hover:bg-purple-600 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            Send
            <FontAwesomeIcon icon={faShare} size="lg" />
          </button>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="relative w-full h-full  box-border" id="chat-section">
  //     <h1 className="text-2xl text-yellow-700 font-sans mb-5 border-b border-red-300 p-4">
  //       {sender}
  //     </h1>
  //     <div className="flex flex-col gap-5 h-[73.6vh] overflow-y-auto mb-5 p-4">
  //       {messages?.map((item) => (
  //         <div
  //           key={item._id}
  //           className={`flex gap-5 p-3 w-max max-w-[75%] max-h-40 overflow-y-auto ${
  //             item.sender === id
  //               ? "bg-blue-500 text-white rounded-t-lg rounded-br-lg rounded-bl-none"
  //               : "bg-gray-300 text-black rounded-t-lg rounded-bl-lg rounded-br-none"
  //           }`}
  //         >
  //           <p>{item.sender === id ? "You" : "Other"} </p>
  //           <p>{item.message}</p>
  //         </div>
  //       ))}
  //     </div>
  //     <div className="absolute bottom-0 h-16 w-[90%] lg:w-[97%] bg-white flex items-center p-4">
  //       <div className="relative flex items-center w-[98%] box-border h-10 rounded-lg border border-neutral-950 p-5 pl-0 overflow-hidden pr-14">
  //         <input
  //           value={msg}
  //           type="text"
  //           placeholder="Message here"
  //           onChange={(e) => setMsg(e.target.value)}
  //           className=" p-3 w-full border-none focus:outline-none focus:border-transparent focus:ring-0"
  //         />
  //         <button
  //           onClick={handleClick}
  //           className="absolute right-3 w-16 text-white font-mono font-semibold bg-purple-500 rounded-2xl top-1 bottom-1"
  //         >
  //           Send
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Chat;

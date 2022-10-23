import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
//connecting to the backEnd server

const Message = () => {
  const socket = io.connect("http://localhost:3001");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messageList, setMessageList] = useState([]);

  const JoinRoom = () => {
    if (room !== "") {
      socket.emit(`join_room`, room);
      setShowChat(true);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageList((list) => [...list, message]);
    });
  }, [socket]);

  return (
    <div className="flex justify-center flex-col items-center w-screen">
      {!showChat ? (
        <div className="text-center">
          <h1 className="text-3xl text-blue-500 underline decoration-black font-serif text-center">
            Join a room
          </h1>
          <div className="mt-10">
            <input
              className="border-black border-2 bg-gray-500/20 ml-2 rounded-lg"
              type="text"
              placeholder="Room ID"
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <button
            onClick={JoinRoom}
            className="mt-10 border-black bg-gray-200/50 border-2 italic text-blue-500 p-1 rounded-3xl text-center hover:bg-blue-400 hover:text-black duration-300"
          >
            Join a room
          </button>
        </div>
      ) : (
        <Chat room={room} socket={socket} messageList={messageList} />
      )}
    </div>
  );
};
export default Message;

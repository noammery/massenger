import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
//connecting to the backEnd server

const Message = () => {
  const socket = io.connect(`https://puce-odd-chipmunk.cyclic.app`, {
    transports: ["websocket"],
  });
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messageList, setMessageList] = useState([]);
  let [askedQuestion, setAskedQuestion] = useState("");
  const [resetChat, setResetChat] = useState(false);

  const JoinRoom = () => {
    if (room !== "") {
      socket.emit(`join_room`, room);
      setShowChat(true);
    }
  };

  const setIt = (data) => {
    console.log(data);
    setAskedQuestion(data);
  };

  const leaveChat = async (e) => {
    await socket.emit(`leave`, room);
    setShowChat(false);
  };
  useEffect(() => {
    socket.on("receive_message", (message) => {
      if (!resetChat) {
        setMessageList((list) => [...list, message]);
      } else {
        setMessageList([...message]);
      }
      setResetChat(false);
    });
    socket.on(`asked_question`, (data1) => {
      const theData = data1;
      setIt(theData);
    });
    socket.on(`reset_chat`, () => {
      setMessageList([]);
      setResetChat(true);
    });
    // eslint-disable-next-line
  }, [socket]);

  return (
    <div className="flex justify-center flex-col items-center w-screen h-screen bg-blue-400">
      {!showChat ? (
        <form onSubmit={JoinRoom} className="text-center">
          <h1 className="text-3xl text-black underline decoration-black italic text-center">
            Join a room
          </h1>
          <div className="mt-10">
            <input
              className="border-black border-2 bg-gray-500/20 ml-2 rounded-lg  text-center"
              type="text"
              placeholder="Room ID"
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-10 border-black bg-gray-200/50 border-2 italic text-blue-500 p-1 rounded-3xl text-center hover:bg-black hover:text-white hover:border-white duration-300"
          >
            Join a room
          </button>
        </form>
      ) : (
        <div>
          <Chat
            room={room}
            socket={socket}
            setMessageList={setMessageList}
            messageList={messageList}
            askedQuestion={askedQuestion}
          />
          <button onClick={() => leaveChat()}>Leave Room</button>
        </div>
      )}
    </div>
  );
};
export default Message;

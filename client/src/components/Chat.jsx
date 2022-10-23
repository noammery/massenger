import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Chat = (props) => {
  const email = useSelector((state) => state.user.email);
  const room = props.room;
  const socket = props.socket;
  const messageList = props.messageList;
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState();
  const [user, setUser] = useState();

  const Send = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        message: message,
        author: user,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      setInputValue("");
      await socket.emit(`send_message`, messageData);
      setInputValue();
      setMessage("");
    }
  };

  useEffect(() => {
    const find = { email: email };
    axios
      .post("http://localhost:3001/user/find", find)
      .then((res) => setUser(res.data.fullName));
  }, []);
  console.log(user);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div>
        <h1 className="text-center text-xl font-semibold">
          Better then Whatsapp Chat
        </h1>
        <h1 className="mt-2 text-center text-lg italic font-medium">
          welcome {user}, chat in room: {room}
        </h1>
      </div>
      <div className="w-64 h-80 border-green-700 border-2 bg-orange-200/20 flex flex-col overflow-y-scroll overflow-hidden  scrollbar-hide">
        {messageList.map((message, index) => {
          return message.author === user ? (
            <div key={index} className="inline-flex w-60 break-all">
              <div className="bg-blue-600/80 px-3 rounded-lg mt-2 ml-2 ">
                <p className="text-xs italic">{message.author}</p>
                <h1 className="text-md">{message.message}</h1>
                <p className="text-xs mr-2 font-semibold">{message.time}</p>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="inline-flex justify-end w-60 break-all "
            >
              <div className="bg-green-600/80 px-3 rounded-lg mt-2 ml-2">
                <p className="text-xs italic">{message.author}:</p>
                <h1 className="text-md">{message.message}</h1>
                <p className="text-xs mr-2">{message.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-64">
        <input
          type="text"
          placeholder="Enter a message"
          className="border-green-700 border-2 border-r-0 h-10 w-52"
          onChange={(e) => setMessage(e.target.value)}
          value={inputValue}
        />
        <button
          type="submit"
          className="bg-gray-400/50  w-12 h-10 border-green-700 border-2 border-l-black"
          onClick={Send}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chat;

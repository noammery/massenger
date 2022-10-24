import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Chat = (props) => {
  const email = useSelector((state) => state.user.email);
  let askedQuestion = props.askedQuestion;
  // eslint-disable-next-line
  const { room, socket, messageList, setMessageList } = props;
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState();
  const [user, setUser] = useState();
  const endMessage = useRef(null);
  const [adminRespone, setAdminRespone] = useState("");
  // eslint-disable-next-line
  const [prevQuestion, setPrevQuestion] = useState("");
  const [answer7, setAnswer7] = useState("");

  const Room7 = (e) => {
    e.preventDefault();
    if (message !== "") {
      axios
        .post(`${process.env.REACT_APP_SECERET_NAME_BACKENDURL}/ai/question`, {
          question: message,
        })
        .then((res) =>
          res.data === null ? setAnswer7("sorry") : setAnswer7(res.data.answer)
        );
    }
  };

  useEffect(() => {
    if (answer7 !== "") {
      const messageData = {
        room: room,
        message: message,
        author: user,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      const messageData2 = {
        room: room,
        message: answer7,
        author: "AI",
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit(`send_message`, messageData);
      socket.emit(`send_message`, messageData2);
    }
    // eslint-disable-next-line
  }, [answer7]);

  const AdminChat = (data) => {
    setAdminRespone(data);
    setMessage(data);
  };
  const AdminQuestion = (data) => {
    setPrevQuestion(data);
    setMessage(data);
  };

  const SubmitIt = async (e) => {
    e.preventDefault();
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
    const newAnswer = {
      question: askedQuestion,
      answer: adminRespone,
    };
    axios
      .post(
        `${process.env.REACT_APP_SECERET_NAME_BACKENDURL}/ai/answers`,
        newAnswer
      )
      .then((res) => console.log(res.data));
  };

  const Send = async (e) => {
    e.preventDefault();
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
    if (room === "admin" && user !== "admin admin" && message !== "") {
      socket.emit(`submit_question`, message);
    }
  };

  useEffect(() => {
    endMessage.current?.scrollIntoView();
  }, [messageList]);

  useEffect(() => {
    const find = { email: email };
    axios
      .post(`${process.env.REACT_APP_SECERET_NAME_BACKENDURL}/user/find`, find)
      .then((res) => setUser(res.data.fullName));
  }, [email]);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div>
        <h1 className="text-center text-xl font-semibold italic underline decoration-purple-700">
          Better then Whatsapp Chat
        </h1>
        <h1 className="mt-2 text-center text-lg italic font-medium">
          welcome {user}, currently in room: {room}
        </h1>
      </div>
      <div className="w-64 h-80 border-black border-2 bg-orange-200/80 flex flex-col overflow-y-scroll overflow-hidden  scrollbar-hide rounded-md">
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
        <div ref={endMessage}></div>
      </div>
      <form
        onSubmit={
          room === "7"
            ? Room7
            : room === "admin" && user === "admin admin"
            ? SubmitIt
            : Send
        }
        className="w-64"
      >
        <input
          type="text"
          placeholder="Enter a message"
          className="border-black border-2  h-10 w-52 mt-1 rounded-md"
          onChange={(e) =>
            room === "admin" && user === "admin admin"
              ? AdminChat(e.target.value)
              : room === "admin"
              ? AdminQuestion(e.target.value)
              : setMessage(e.target.value)
          }
          value={inputValue}
        />
        <button
          type="submit"
          className="bg-gray-400/50  w-12 h-10 border-black border-2 border-l-black rounded-md"
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default Chat;

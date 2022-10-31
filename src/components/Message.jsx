import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import Chat from "./Chat";
import Loading from "./Loading";

const Message = () => {
  //connecting to the backEnd server
  // https://nmmessanger-api.herokuapp.com
  const socket = io.connect(`https://nmmessanger-api.herokuapp.com`, {
    withCredentials: true,
    transports: ["websocket"],
  });
  const email = useSelector((state) => state.user.email);
  const [user, setUser] = useState();
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [messageList, setMessageList] = useState([]);
  let [askedQuestion, setAskedQuestion] = useState("");
  const [error, setError] = useState(false);
  const [roomList, setRoomList] = useState();
  const [loading, setLoading] = useState(false);

  const JoinRoom = async (e) => {
    setLoading(true);
    if (room !== "") {
      socket.emit(`join_room`, room);
      setShowChat(true);
      setError(false);
      let message = "";
      await axios
        .post(
          `${process.env.REACT_APP_SECERET_NAME_BACKENDURL}/history/gethistory`,
          { room: room }
        )
        .then((res) => (message = res.data));
      setMessageList([...message]);
    } else {
      e.preventDefault();
      setError(true);
    }
    setLoading(false);
  };

  const setIt = (data) => {
    console.log(data);
    setAskedQuestion(data);
  };

  const leaveChat = async (e) => {
    await socket.emit(`leave`, room);
    navigate("/");
  };
  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageList((list) => [...list, message]);
    });
    socket.on(`asked_question`, (data1) => {
      const theData = data1;
      setIt(theData);
    });
    socket.on(`reset_chat`, () => {
      setMessageList([]);
    });
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    if (!showChat) {
      user &&
        axios
          .post(
            `${process.env.REACT_APP_SECERET_NAME_BACKENDURL}/history/getrooms`,
            { author: user }
          )
          .then((res) => setRoomList(res.data));
    }
  }, [showChat, user]);
  useEffect(() => {
    const find = { email: email };
    axios
      .post(`${process.env.REACT_APP_SECERET_NAME_BACKENDURL}/user/find`, find)
      .then((res) => setUser(res.data.fullName));
  }, [email]);

  async function Clickedroom(room1) {
    setRoom(room1);
    room && JoinRoom();
  }
  return (
    <div className="flex justify-center flex-col items-center w-screen h-auto min-h-screen bg-blue-400">
      {!showChat ? (
        <div className="flex flex-col justify-between">
          <form onSubmit={JoinRoom} className="text-center mt-20">
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
              {error && (
                <h1 className="text-red-500 text-sm font-semibold">
                  SELECT A ROOM!
                </h1>
              )}
            </div>
            <button
              type="submit"
              className="mt-10 border-black bg-gray-200/50 border-2 italic text-blue-500 p-1 rounded-3xl text-center hover:bg-black hover:text-white hover:border-white duration-300"
            >
              Join a room
            </button>
          </form>
          <h1 className="text-center m-4 text-xl underline italic  decoration-blue-800 font-extrabold decoration-4">
            Your rooms
          </h1>
          <div className="flex w-72 flex-wrap">
            {roomList ? (
              roomList.map((roomName, index) => {
                return (
                  <h1
                    className="border-4 border-blue-800 rounded-lg font-semibold italic cursor-pointer  text-center m-2 w-20"
                    key={index}
                    onClick={() => Clickedroom(roomName)}
                  >
                    {roomName}
                  </h1>
                );
              })
            ) : (
              <div className="flex justify-center align-middle w-72 mt-10">
                <Loading />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Chat
            loading={loading}
            room={room}
            socket={socket}
            setMessageList={setMessageList}
            messageList={messageList}
            askedQuestion={askedQuestion}
          />
          <div className="text-center mt-4">
            <button
              onClick={() => leaveChat()}
              className="border-2 border-black p-1 rounded-lg bg-red-800 text-white italic"
            >
              Leave Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Message;

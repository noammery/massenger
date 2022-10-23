import Message from "./components/Message";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector } from "react-redux";
import Error from "./components/Error";

function App() {
  const user = useSelector((state) => state.user.email);
  return (
    <div className="App">
      <Routes>
        {user ? (
          <Route path="chat" element={<Message />} />
        ) : (
          <Route path="chat" element={<Error />} />
        )}
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

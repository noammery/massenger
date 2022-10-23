import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const theUser = useSelector((state) => state.user.email);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const HandleLogin = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3001/user/login", user)
      .then((res) => dispatch(login(res.data.email)))
      .then(theUser && navigate("/chat"));
  };
  return (
    <div>
      <form onSubmit={HandleLogin}>
        <div>
          <label>Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login!</button>
      </form>
    </div>
  );
};
export default Login;

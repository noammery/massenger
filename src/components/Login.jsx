import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
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
      .post(`${process.env.REACT_APP_SECERET_NAME_BACKENDURL}/user/login`, user)
      .then((res) => dispatch(login(res.data.email)) && navigate("/chat"));
  };
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <form onSubmit={HandleLogin} className="text-center">
        <h1 className="text-center text-3xl  font-extrabold mb-6">Login</h1>
        <div className="flex flex-col">
          <input
            placeholder="email@example.com"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-purple-500 mb-5"
          />
        </div>
        <div className="flex flex-col">
          <input
            placeholder="****"
            className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-purple-500 "
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="py-4 bg-purple-600 w-full rounded text-purple-50 font-bold hover:bg-purple-700 mt-5"
        >
          Login!
        </button>
        <br></br>
        <Link
          to="/register"
          className="text-sm text-black/50 hover:text-purple-900"
        >
          Dont have an account?
        </Link>
      </form>
    </div>
  );
};
export default Login;

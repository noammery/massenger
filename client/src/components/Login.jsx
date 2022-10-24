import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="h-screen w-screen bg-blue-400 flex justify-center items-center">
      <form onSubmit={HandleLogin} className="text-center">
        <h1 className="text-2xl underline decoration-blue-900 mb-7">Login</h1>
        <div className="flex flex-col">
          <label className="text-black italic text-xl">Email</label>
          <input
            placeholder="email@example.com"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="border-black border-2 text-center text-blue-900 rounded-md "
          />
        </div>
        <div className="flex flex-col">
          <label className="text-black italic text-xl">password</label>
          <input
            placeholder="****"
            className="border-black border-2 text-center text-blue-900 rounded-md "
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer border-2 border-white rounded-2xl text-white w-20 bg-blue-800 hover:bg-black hover:text-red-500 hover:border-red-500 duration-500 italic  mt-8 hover:scale-110 mb-10"
        >
          Login!
        </button>
        <br></br>
        <Link
          to="/register"
          className="text-black italic underline decoration-black"
        >
          Dont have an account?
        </Link>
      </form>
    </div>
  );
};
export default Login;

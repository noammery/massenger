import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../slices/userSlice";

const Guests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email));
    navigate("/chat");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-20 items-center"
      >
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="temporary name"
          className="w-44 mb-4 border-black border-2 bg-white/25 text-center rounded-lg"
        />
        <button
          type="submit"
          className="p-1 border-2 border-blue-900 rounded-lg bg-black text-white italic text-sm w-36 "
        >
          JOIN AS A GUEST
        </button>
      </form>
    </div>
  );
};
export default Guests;

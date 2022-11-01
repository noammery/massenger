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
          className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 text-center"
        />
        <button
          type="submit"
          className="py-4 bg-purple-600 w-full rounded text-blue-50 font-bold hover:bg-purple-700 mt-5"
        >
          JOIN AS A GUEST
        </button>
      </form>
    </div>
  );
};
export default Guests;

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.email);
  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="w-screen h-16 bg-black fixed flex justify-between border-b-2 border-b-purple-800 overflow-x-hidden">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-white ml-6 italic border-purple-800 p-2 rounded-full border-4 text-xl"
        >
          BTW
        </Link>
      </div>
      <div className="flex">
        {location !== "/" ? (
          <Link
            to="/"
            className="text-white italic hover:text-purple-800 duration-200 m-5"
          >
            HOME
          </Link>
        ) : (
          <Link to="/" className="text-purple-800 font-extrabold italic  m-5">
            HOME
          </Link>
        )}

        {!user ? (
          <div className="flex">
            {location !== "/login" ? (
              <Link
                to="/login"
                className="text-white italic hover:text-purple-800 duration-200 m-5"
              >
                LOGIN
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-purple-800 font-extrabold italic   m-5"
              >
                LOGIN
              </Link>
            )}
            {location !== "/register" ? (
              <Link
                to="/register"
                className="text-white italic hover:text-purple-800 duration-200 m-5"
              >
                REGISTER
              </Link>
            ) : (
              <Link
                to="/register"
                className="text-purple-800 font-extrabold italic  m-5"
              >
                REGISTER
              </Link>
            )}
          </div>
        ) : location !== "/chat" ? (
          <Link
            to="/chat"
            className="text-white italic hover:text-purple-800 duration-200 m-5"
          >
            CHAT
          </Link>
        ) : (
          <Link
            to="/chat"
            className="text-purple-800 font-extrabold italic   m-5"
          >
            CHAT
          </Link>
        )}
        {user && (
          <button
            onClick={() => dispatch(logoutUser)}
            className="text-white italic  duration-200 m-5 hover:text-purple-800"
          >
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;

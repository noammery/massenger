import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation().pathname;
  const user = useSelector((state) => state.user.email);
  console.log(location);
  return (
    <div className="w-screen h-16 bg-black fixed flex justify-between">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-white ml-6 italic border-blue-500 p-2 rounded-full border-4 text-xl"
        >
          BTW
        </Link>
      </div>
      <div className="flex">
        {location !== "/" ? (
          <Link
            to="/"
            className="text-white italic hover:text-green-500 duration-200 m-5"
          >
            HOME
          </Link>
        ) : (
          <Link to="/" className="text-green-500 italic  duration-200 m-5">
            HOME
          </Link>
        )}

        {!user ? (
          <div className="flex">
            {location !== "/login" ? (
              <Link
                to="/login"
                className="text-white italic hover:text-green-500 duration-200 m-5"
              >
                LOGIN
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-green-500 italic  duration-200 m-5"
              >
                LOGIN
              </Link>
            )}
            {location !== "/register" ? (
              <Link
                to="/register"
                className="text-white italic hover:text-green-500 duration-200 m-5"
              >
                REGISTER
              </Link>
            ) : (
              <Link
                to="/register"
                className="text-green-500 italic duration-200 m-5"
              >
                REGISTER
              </Link>
            )}
          </div>
        ) : location !== "/chat" ? (
          <Link
            to="/chat"
            className="text-white italic hover:text-green-500 duration-200 m-5"
          >
            CHAT
          </Link>
        ) : (
          <Link to="/chat" className="text-green-500 italic  duration-200 m-5">
            CHAT
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;

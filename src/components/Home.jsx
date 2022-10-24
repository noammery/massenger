import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-screen bg-blue-400 flex justify-center items-center">
      <div>
        <h1 className=" text-sm font-thin text-white">Welcome to:</h1>
        <h1 className="italic text-3xl font-extrabold">BETTER THEN WhatsApp</h1>
        <p className="text-center font-thin text-xs text-black/70 mt-5">
          online self - learning BOT
        </p>
        <p className="text-center font-thin text-xs text-black/70 ">
          Noam Mery
        </p>
        <div className="text-center mt-8">
          <Link to="/register" className="mr-5 italic underline">
            Register
          </Link>
          <Link to="/login" className="ml-5 italic underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;

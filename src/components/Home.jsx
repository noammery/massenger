import { useSelector } from "react-redux";
import Guests from "./Guest";

const Home = () => {
  const user = useSelector((state) => state.user.email);
  return (
    <div className="h-screen w-screen bg-blue-400 flex justify-center items-center">
      <div>
        <h1 className=" text-sm  text-center  text-white mb-5 font-semibold italic">
          Welcome to
        </h1>
        <h1 className="italic text-3xl font-extrabold underline decoration-4 decoration-blue-900">
          BETTER THEN WhatsApp
        </h1>
        <p className="text-center text-xs text-black/70 mt-5">
          online self - learning BOT
        </p>
        <p className="text-center text-xs text-black/70 ">Noam Mery</p>
        {!user && <Guests />}
      </div>
    </div>
  );
};
export default Home;

import { useSelector } from "react-redux";
import Guests from "./Guest";

const Home = () => {
  const user = useSelector((state) => state.user.email);
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <div>
        <h1 className="text-center text-3xl  font-extrabold mb-6 text-purple-500 ">
          BTW
        </h1>
        <p className="text-center text-xs text-black/70 mt-5">
          Online massenger and a self-learning bot!
        </p>
        <p className="text-center text-xs text-black/70 ">By Noam Mery</p>
        {!user && <Guests />}
      </div>
    </div>
  );
};
export default Home;

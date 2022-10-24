import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  fullName: yup
    .string()
    .required()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),

  email: yup.string().email().required(),

  password: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(3, "Must be at least 10 digits")
    .max(10, "Must be less then 10 digits"),
});

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const OnSubmit = async () => {
    const user = {
      fullName: fullName,
      email: email,
      password: password,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SECERET_NAME_BACKENDURL}/user/register`,
      user
    );
    res.data && navigate("login");
  };

  return (
    <div className="flex justify-center align-middle items-center h-screen bg-blue-400">
      <div className=" h-96 flex flex-col justify-between text-center">
        <form
          onSubmit={handleSubmit(OnSubmit)}
          className="flex flex-col h-64 justify-between"
        >
          <h1 className="text-2xl underline decoration-blue-900 mb-7">
            Welcome to the best MESSANGER
          </h1>
          <div className="flex flex-col">
            <label htmlFor="" className="text-black italic text-xl">
              Full Name
            </label>
            <input
              placeholder="James Bond"
              className="border-black border-2 text-center text-blue-900 rounded-md "
              type="text"
              {...register("fullName")}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors?.fullName && (
              <p className="text-red-600">
                {errors?.fullName?.message || "Error!"}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-black italic text-xl">
              Email
            </label>
            <input
              placeholder="JamesBond@gmail.com"
              className="border-black border-2 text-center text-blue-900 rounded-md "
              type="email"
              {...register("email")}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors?.email && (
              <p className="text-red-600">
                {errors?.email?.message || "Error!"}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-black italic text-xl">
              Password
            </label>
            <input
              placeholder="*****"
              className="border-black border-2 text-center text-blue-900 rounded-md "
              type="password"
              {...register("password")}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors?.password && (
              <p className="text-red-600">
                {errors?.password?.message || "Error!"}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isValid}
              className="cursor-pointer border-2 border-white rounded-2xl text-white w-20 bg-blue-800 hover:bg-black hover:text-red-500 hover:border-red-500 duration-500 italic  mt-8 hover:scale-110"
            >
              Register
            </button>
          </div>
        </form>
        <Link
          to="/login"
          className="text-black italic underline decoration-black"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
};
export default Register;

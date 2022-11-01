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
    res.data && navigate("/");
  };

  return (
    <div className="flex justify-center align-middle items-center h-screen bg-white">
      <div className=" h-96 flex flex-col justify-between text-center">
        <form
          onSubmit={handleSubmit(OnSubmit)}
          className="flex flex-col h-64 justify-between"
        >
          <h1 className="text-center text-3xl  font-extrabold mb-6">
            Register
          </h1>
          <div className="flex flex-col">
            <input
              placeholder="James Bond"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-purple-500 mb-5"
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
            <input
              placeholder="JamesBond@gmail.com"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-purple-500 mb-5"
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
            <input
              placeholder="*****"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-purple-500 mb-5"
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
              className="py-4 bg-purple-600 w-full rounded text-purple-50 font-bold hover:bg-purple-700 mt-5"
            >
              Register
            </button>
          </div>
        </form>
        <Link
          to="/login"
          className="text-sm text-black/50 hover:text-purple-900"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
};
export default Register;

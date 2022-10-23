import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const OnSubmit = () => {
    const user = {
      fullName: fullName,
      email: email,
      password: password,
    };
    axios.post("http://localhost:3001/user/register", user);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <div>
          <label htmlFor="">Full Name</label>
          <input
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
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            {...register("email")}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors?.email && (
            <p className="text-red-600">{errors?.email?.message || "Error!"}</p>
          )}
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
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
        <button type="submit" disabled={!isValid}>
          Register!
        </button>
      </form>
      <Link to="login">Already have an account?</Link>
    </div>
  );
};
export default Register;

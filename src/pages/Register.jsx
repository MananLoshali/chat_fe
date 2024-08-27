import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../api";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("/auth/register", user);
      if (res.data.success === true) {
        navigate("/login");
        toast.success(res.data.msg);
      }
    } catch (error) {
      const msg = error.response.data.msg;
      toast.error(msg);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-yellow-500">
      <div className="border rounded-lg border-red-500 p-5">
        <h1 className="font-semibold text-purple-500 text-4xl font-mono mb-3">
          Register Here
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-4 flex flex-col gap-8 justify-center items-center"
        >
          <input
            type="text"
            placeholder="Enter your username"
            className="w-96 h-4 box-border p-5 rounded-lg bg-transparent border border-green-500 text-black text-xl"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-96 h-4 box-border p-5 rounded-lg bg-transparent border border-green-500 text-black text-xl"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-96 h-4 box-border p-5 rounded-lg bg-transparent border border-green-500 text-black text-xl"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            className="w-40 border rounded-lg border-none bg-emerald-500 box-border p-2"
            type="submit"
          >
            Register
          </button>
        </form>
        <p>
          Already a User?{" "}
          <Link className="text-blue-500" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

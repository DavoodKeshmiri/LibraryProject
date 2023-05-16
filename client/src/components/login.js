import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://localhost:8001/api/user/login", user).then((res) => {
      console.log("login res ===", res);
      alert(res.data.message);
      res.data.user && setLoginUser(res.data.user);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    });
  };

  return (
    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        Login
      </div>
      <div className="mt-8">
        <form autoComplete="off">
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex relative ">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Your password"
              />
            </div>
          </div>

          <div className="flex w-full">
            <button
              type="button"
              className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
              onClick={login}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

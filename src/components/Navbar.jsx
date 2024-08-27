import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../redux/userReducer";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const { name, email } = user;

  const handleClick = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    dispatch(resetUser());
  };
  return (
    <div className="p-3 bg-sky-500 flex justify-between relative">
      <h1 className="text-2xl text-lime-200 font-sans">ChatoPia</h1>
      <div className="h-full flex gap-5">
        <div
          className="mr-14 lg:mr-8 cursor-pointer flex gap-2 items-center"
          onClick={handleClick}
        >
          <FontAwesomeIcon size="lg" icon={faUserAstronaut} />
          <p className="text-white font-semibold capitalize">{name}</p>
        </div>
        {show && (
          <div className="absolute right-2 top-10 h-auto z-20 w-48 rounded-lg bg-white shadow-lg shadow-violet-500 overflow-hidden">
            <div className="p-3 border-b border-gray-200">
              <p className="text-gray-700 font-semibold">Name: {name}</p>
              <p className="text-gray-600 font-semibold">Email: {email}</p>
              <button
                className="py-1 px-2 cursor-pointer mt-4 rounded-md bg-red-500 text-white font-semibold font-mono"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

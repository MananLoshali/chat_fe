import React, { useEffect, useState } from "react";
import { getPrivateRequest } from "../api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AllUser = (props) => {
  const { setToggle } = props;
  const currentUser = useSelector((state) => state.user?.user);
  const id = currentUser?.id;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const privateRequest = getPrivateRequest();
        const res = await privateRequest.get(`/users/${id}`);
        console.log(res.data, "data");
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    getUsers();
  }, []);

  const handleClick = async (user) => {
    try {
      const privateRequest = getPrivateRequest();
      const res = await privateRequest.post(`/users/add-user/${id}`, {
        userId: user,
      });
      const msg = await res.data.msg;
      toast.success(msg);
    } catch (error) {
      const msg = error.response.data.msg;
      toast.warning(msg);
    }
    setToggle(false);
  };

  const handleToggle = () => {
    setToggle(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-md">
      <div className="w-[90vw] lg:w-[40vw] max-h-[80vh] rounded-lg bg-white shadow-2xl overflow-auto p-6 relative">
        <div
          className="w-8 h-8 absolute right-4 top-4 cursor-pointer bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition duration-1000"
          onClick={handleToggle}
        >
          <p className="text-white font-semibold text-xl pb-1">x</p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Users List
        </h2>
        {!users?.length && (
          <p className="text-center text-gray-500">No users found</p>
        )}
        {users?.length && (
          <div className="flex flex-col gap-4">
            {users.map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition duration-200"
              >
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={() => handleClick(user._id)}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUser;

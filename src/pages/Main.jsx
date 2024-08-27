import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getPrivateRequest, privateRequest } from "../api";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import AllUser from "../components/AllUser";
import { MyContext } from "../contexts/myContexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../redux/userReducer";

const Main = () => {
  const currentUser = useSelector((state) => state.user?.user);
  const id = currentUser?.id;
  const { id: receiverId } = useParams();
  const { setSender } = useContext(MyContext);
  const [contacts, setContacts] = useState([]);
  const [allUsers, showAllUsers] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { sender } = useContext(MyContext);
  const dispatch = useDispatch();

  const toggleViewAllUsers = () => {
    showAllUsers(!allUsers);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const privateRequest = getPrivateRequest();
        const res = await privateRequest.get(`/users/contact/${id}`);
        if (res.data.success) {
          setContacts(res.data?.contactUsers?.contacts);
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    getContacts();
  }, [allUsers]);

  // useEffect(() => {
  //   if (!id) {
  //     navigate("/login");
  //   }
  // }, []);

  const handleClick = (name) => {
    dispatch(setSelectedChat(name));
    setSender(name);
    if (window.innerWidth < 900) {
      setSidebarOpen(false); // Close the sidebar on small screens after selecting a contact
    }
  };
  return (
    <div className="relative">
      <Navbar />
      <button
        onClick={toggleSidebar}
        className="fixed top-2 right-4 z-50 lg:hidden bg-purple-500 text-white p-2 rounded-md"
      >
        <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} size="lg" />
      </button>
      <div className="flex">
        <div
          id="sidebar"
          className={`p-4 border-r border-r-amber-200 h-screen lg:h-[90vh] w-[50%] lg:w-[25%] lg:static fixed inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 bg-white shadow-lg z-40`}
        >
          <h1 className="text-xl text-fuchsia-500 font-sans mb-5">Contacts</h1>
          <input
            className="p-2 rounded-lg bg-transparent border border-green-500 text-black text-md mb-5 w-[90%]"
            type="search"
            placeholder="Search Contacts"
          />
          {!contacts?.length && <p>No Contacts found</p>}
          {contacts && (
            <div className="flex flex-col gap-4">
              {contacts?.map((contact) => (
                <Link
                  key={contact.email}
                  to={`/chats/${contact._id}`}
                  onClick={() => handleClick(contact.name)}
                  className={`block box-border rounded-lg bg-slate-200 shadow-lg py-2 px-4 cursor-pointer ${
                    sender === contact.name
                      ? "shadow-gray-900"
                      : "shadow-gray-300 "
                  }`}
                >
                  <p className="text-ellipsis w-[95%] whitespace-nowrap overflow-hidden ">
                    {contact.name}
                  </p>
                  <p className="text-ellipsis w-[95%] whitespace-nowrap overflow-hidden ">
                    {contact.email}
                  </p>
                </Link>
              ))}
            </div>
          )}
          <div className="absolute bottom-5 right-2 rounded-xl bg-orange-500 cursor-pointer py-1 px-2 shadow-lg shadow-fuchsia-400">
            <div onClick={toggleViewAllUsers}>
              <FontAwesomeIcon icon={faUsers} size="lg" />
            </div>
          </div>
        </div>
        {!receiverId && (
          <div className="w-[100%] lg:w-[80%] h-screen lg:h-[90vh] flex justify-center items-center bg-gray-100">
            <p className="text-lg font-semibold text-gray-600">
              Click on the contacts to start a chat
            </p>
          </div>
        )}
        {receiverId && (
          <div id="chat-secition" className="w-[100%] lg:w-[80%]">
            <Outlet />
          </div>
        )}
      </div>
      {allUsers && (
        <div className="absolute top-0 left-0 ">
          <AllUser setToggle={showAllUsers} />
        </div>
      )}
    </div>
  );
};

export default Main;

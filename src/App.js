import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Chat from "./pages/Chat";
import { useEffect, useState } from "react";
import { MyContext } from "./contexts/myContexts";
import GuardedLayout from "./layout/GuardedLayout";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/userReducer";

// const router = createBrowserRouter([
//   {
//     element: <GuardedLayout />,
//     path: "/",
//     element: <Main />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/chats/:id",
//         element: <Chat />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     errorElement: <Error />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//     errorElement: <Error />,
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuardedLayout />, // Protected layout
    errorElement: <Error />,
    children: [
      {
        path: "/", // Main route
        element: <Main />,
        children: [
          {
            path: "/chats/:id", // Nested route under /
            element: <Chat />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

function App() {
  const [sender, setSender] = useState("");

  return (
    <>
      <MyContext.Provider value={{ sender, setSender }}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    </>
  );
}

export default App;

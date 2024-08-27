import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const GuardedLayout = () => {
  const currentUser = useSelector((state) => state.user?.user);
  const id = currentUser?.id;

  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      return navigate("/login", { replace: true });
    }
  }, [currentUser]);

  return <Outlet />;
};

export default GuardedLayout;

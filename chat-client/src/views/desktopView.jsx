import React, { useEffect } from "react";
import Home from "../pages/homePage/home";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const DesktopView = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);
  return <Home />;
};

export default DesktopView;

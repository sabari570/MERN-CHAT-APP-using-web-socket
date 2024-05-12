import React from "react";
import { Outlet } from "react-router-dom";
import LayoutBg from "../layout-bg/layoutBg";

const Layout = () => {
  return (
    <>
      <LayoutBg>
        <Outlet />
      </LayoutBg>
    </>
  );
};

export default Layout;

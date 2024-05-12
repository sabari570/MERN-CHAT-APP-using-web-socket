import React, { Children } from "react";

const LayoutBg = ({children}) => {
  return (
    <div className="container">
      <div className="ball-1"></div>
      <div className="ball-2"></div>
      <div className="ball-3"></div>
      {children}
    </div>
  );
};

export default LayoutBg;

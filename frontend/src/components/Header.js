import React from "react";
import logoHeader from "../assets/icon-white.svg";

const Header = () => {
  return (
    <div className="header">
      <img src={logoHeader} alt="Logo Groupomania" />

      {/* <p>Groupomania</p> */}
    </div>
  );
};

export default Header;

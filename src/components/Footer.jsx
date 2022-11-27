import React from "react";
import Logo from "../assets/images/logo-outline.png";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='logo'>
          <img src={Logo} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Footer;

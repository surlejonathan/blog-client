import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='' />
          </Link>
        </div>
        <div className='links'>
          <Link to='/' className='nav-link'>
            Design
          </Link>
          <Link to='/' className='nav-link'>
            Tech
          </Link>
          <Link to='/' className='nav-link'>
            News
          </Link>
          <span>John</span>
          <span>Logout</span>
          <Link className='write' to='/write'>
            Write
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

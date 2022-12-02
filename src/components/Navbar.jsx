import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { username } = currentUser || {};
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
          {currentUser ? (
            <>
              <span>{username}</span>
              <span onClick={logout}>Logout</span>
            </>
          ) : (
            <Link to='/login' className='nav-link'>
              Login
            </Link>
          )}
          <Link className='write' to='/write'>
            Write
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

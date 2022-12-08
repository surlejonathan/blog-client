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
          <div className='link-items'>
            <Link to='/?category=design' className='nav-link'>
              Design
            </Link>
            <Link to='/?category=tech' className='nav-link'>
              Tech
            </Link>
            <Link to='/?category=news' className='nav-link'>
              News
            </Link>
          </div>
          <div className='user-links'>
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
    </div>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className='auth'>
      <h1>Sign up</h1>
      <form>
        <input required type='text' placeholder='username' />
        <input required type='email' placeholder='email' />
        <input required type='password' placeholder='password' />
        <button>Register</button>
        <p>There is an error !</p>
        <span>
          Have already an account ? <Link to='/login'>Sign in now !</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;

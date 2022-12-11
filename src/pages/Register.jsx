import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { username, password, email } = inputValues;

  const handleChange = (e) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        inputValues
      );
      setSuccess("Your account has been successfully created");
      setError(false);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className='auth'>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type='text'
          name='username'
          placeholder='username'
          value={username}
          onChange={handleChange}
        />
        <input
          required
          type='email'
          name='email'
          placeholder='email'
          value={email}
          onChange={handleChange}
        />
        <input
          required
          type='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={handleChange}
        />
        <button type='submit'>Register</button>
        {error && <p>{error}</p>}
        {success && <p className='success-message'>{success}</p>}
        <span>
          Have already an account ? <Link to='/login'>Sign in now !</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;

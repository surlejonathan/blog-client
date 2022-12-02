import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputValues;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputValues);
      setSuccess("You are successfully signed in");
      setError("");
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='username'
          name='username'
          value={username}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          value={password}
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
        {error && <p>{error}</p>}
        {success && <p className='success-message'>{success}</p>}
        <span>
          No account yet ? <Link to='/register'>Sign up now !</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

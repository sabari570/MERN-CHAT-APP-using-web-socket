import React, { useEffect, useState } from "react";
import "./login.styles.css";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";
import Loader from "../../components/loader/loader.component";

const Login = () => {
  const INITIAL_USERDATA = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [userData, setUserData] = useState(INITIAL_USERDATA);
  const {loading, login} = useLogin();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      navigate("/");
    }
  }, []);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userData);
  };

  return (
    <div className="box">
      <div className="auth-page-heading">
        <h2 className="left-side-heading">Login</h2>
        <h2 className="right-side-heading">ChatApp</h2>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="useremail-block">
          <label>
            <span>Username</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="useremail-input"
            onChange={changeInputHandler}
            value={userData.email}
          />
        </div>

        <div className="password-block">
          <label>
            <span>Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="password-input"
            onChange={changeInputHandler}
            value={userData.password}
          />
        </div>

        <small className="login-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </small>

        <button className="login-btn">{loading ? < Loader/> : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import "./register.styles.css";
import { Link, useNavigate } from "react-router-dom";
import GenderComponent from "../../components/gender/genderComponent";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";
import useSignup from "../../hooks/useSignup";
import Loader from "../../components/loader/loader.component";

const Register = () => {
  const INITIAL_USERDATA = {
    name: "",
    email: "",
    gender: "",
    password: "",
    password2: "",
  };

  const [userData, setUserData] = useState(INITIAL_USERDATA);
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const { loading, signUp } = useSignup();

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

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await signUp(userData);
  };

  return (
    <div className="box">
      <div className="auth-page-heading">
        <h2 className="left-side-heading">Signup</h2>
        <h2 className="right-side-heading">ChatApp</h2>
      </div>

      <form className="login-form" onSubmit={onFormSubmit}>
        <div className="useremail-block">
          <label>
            <span>Username</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your username"
            className="username-input"
            onChange={changeInputHandler}
            value={userData.name}
          />
        </div>

        <div className="useremail-block">
          <label>
            <span>Useremail</span>
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

        <div className="password-block">
          <label>
            <span>Confirm Password</span>
          </label>
          <input
            type="password"
            name="password2"
            placeholder="Confirm password"
            className="password-input"
            onChange={changeInputHandler}
            value={userData.password2}
          />
        </div>

        <GenderComponent
          changeInputHandler={changeInputHandler}
          userData={userData}
        />

        <small className="login-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </small>

        <button className="login-btn">{loading? < Loader/> : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default Register;

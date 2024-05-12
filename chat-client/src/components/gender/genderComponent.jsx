import React from "react";
import "./gender.styles.css";

const GenderComponent = ({ changeInputHandler, userData }) => {
  return (
    <div className="gender-block">
      <span>Gender</span>
      <div className="gender-options">
        <input
          type="checkbox"
          name="gender"
          value="male"
          className="gender-inputs"
          onChange={changeInputHandler}
          checked={userData.gender === "male"}
        />
        <label>Male</label>

        <input
          type="checkbox"
          name="gender"
          value="female"
          className="gender-inputs"
          onChange={changeInputHandler}
          checked={userData.gender === "female"}
        />
        <label>Female</label>
      </div>
    </div>
  );
};

export default GenderComponent;

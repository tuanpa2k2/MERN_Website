import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { GoLock, GoUnlock } from "react-icons/go";

import "./AuthenPage.scss";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  return (
    <div className="wrapper-authenPage">
      <div className="box-auth">
        <form action="">
          <h2>Register Account</h2>
          <div className="input-box">
            <span className="icon">
              <CiMail />
            </span>
            <input type="email" placeholder="..." />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span
              className="icon"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <GoUnlock /> : <GoLock />}
            </span>
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="..."
            />
            <label htmlFor="">Password</label>
          </div>
          <div className="input-box">
            <span
              className="icon"
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              {isShowConfirmPassword ? <GoUnlock /> : <GoLock />}
            </span>
            <input
              type={isShowConfirmPassword ? "text" : "password"}
              placeholder="..."
            />
            <label htmlFor="">Confirm Password</label>
          </div>
          <div className="btn-submit">Register</div>
          <div className="link">
            <span>You have a account?</span>
            <p onClick={() => navigate("/sign-in")}>Login Now</p>
          </div>
          <h5 onClick={() => navigate("/")}>back home</h5>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

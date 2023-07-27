import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { GoLock, GoUnlock } from "react-icons/go";

import "./AuthenPage.scss";

const SignInPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="wrapper-authenPage">
      <div className="box-auth">
        <form action="">
          <h2>Login Account</h2>
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
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <p>Forgot password?</p>
          </div>
          <div className="btn-submit">Login</div>
          <div className="link">
            <span>Don't you have an account?</span>
            <p onClick={() => navigate("/sign-up")}>Register Now</p>
          </div>
          <h5 onClick={() => navigate("/")}>Back Home</h5>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

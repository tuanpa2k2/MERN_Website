import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { GoLock, GoUnlock } from "react-icons/go";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";

import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import "./AuthenPage.scss";

const SignInPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);

  // ----- Xử ly API form đăng nhap
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading } = mutation; // lấy data từ mutation

  const handleOnChangeEmail = (e) => {
    const emailed = e.target.value;
    setEmail(emailed);
  };
  const handleOnChangePassword = (e) => {
    const passworded = e.target.value;
    setPassword(passworded);
  };

  const handleSignin = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <div className="wrapper-authenPage">
      <div className="box-auth">
        <form action="">
          <h2>Login Account</h2>
          <div className="input-box">
            <span className="icon">
              <CiMail />
            </span>
            <input type="email" placeholder="..." value={email} onChange={handleOnChangeEmail} />
            <label>Email</label>
            {data?.status === "Err-Empty-email" && <span className="message-err">{data?.message}</span>}
            {data?.status === "Err-Email" && <span className="message-err">{data?.message}</span>}
            {data?.status === "ERROR-EMAIL" && <span className="message-err">{data?.message}</span>}
          </div>
          <div className="input-box">
            <span className="icon" onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? <GoUnlock /> : <GoLock />}
            </span>
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="..."
              value={password}
              onChange={handleOnChangePassword}
              autoComplete="on"
            />
            <label htmlFor="">Password</label>
            {data?.status === "Err-Empty-password" && <span className="message-err">{data?.message}</span>}
            {data?.status === "ERROR-PASSWORD" && <span className="message-err">{data?.message}</span>}
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <p>Forgot password?</p>
          </div>
          <LoadingComponent isLoading={isLoading}>
            <div className="btn-submit" onClick={handleSignin}>
              Login
            </div>
          </LoadingComponent>
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

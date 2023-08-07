import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";

import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";

import "./HeaderComponent.scss";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false); // scrolled add className 'sticky-header'
  const [userAvatar, setUserAvatar] = useState("");

  const user = useSelector((state) => state.user); // lấy user trong redux-store

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setUserAvatar(user?.avatar);
  }, [user?.avatar]);

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleLogoutUser = () => {
    UserService.logoutUser();
    dispatch(resetUser());
    navigate("/");
  };

  return (
    <div>
      <header className={`wrapper-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="inner">
          <div className="left" onClick={() => navigate("/")}>
            <div className="logo">anhtuan shop</div>
          </div>
          <div className="center">
            <input placeholder="Tìm kiếm sản phẩm..." spellCheck={false} />
            <button className="btn-search">
              <AiOutlineSearch />
            </button>
          </div>
          <div className="right">
            {user?.access_token ? (
              <Tippy
                interactive
                render={(attrs) => (
                  <div className="tippy-popper" tabIndex="-1" {...attrs}>
                    <span onClick={() => navigate("/profile")}>Thông tin cá nhân</span>
                    {user?.isAdmin === true && <span onClick={() => navigate("/system-admin")}>Quản lý hệ thống</span>}
                    <span>Cách sử dụng</span>
                    <span onClick={handleLogoutUser}>Đăng Xuất</span>
                  </div>
                )}
              >
                <p className="name-account">
                  {userAvatar ? <img src={userAvatar} alt="userAvatar" /> : <VscAccount />}
                  {user?.name.length ? user?.name : user?.email}
                </p>
              </Tippy>
            ) : (
              <Tippy
                interactive
                render={(attrs) => (
                  <div className="tippy-popper" tabIndex="-1" {...attrs}>
                    <p>Đăng nhập</p>
                  </div>
                )}
              >
                <div className="popper-intro" onClick={() => navigate("/sign-in")}>
                  <VscAccount />
                  tài khoản
                </div>
              </Tippy>
            )}

            <Tippy
              interactive
              render={(attrs) => (
                <div className="tippy-popper" tabIndex="-1" {...attrs}>
                  <p>Giỏ hàng</p>
                </div>
              )}
            >
              <div className="cart-icon" onClick={() => navigate("/productDetails")}>
                <AiOutlineShoppingCart />
                <span>5</span>
              </div>
            </Tippy>

            <span className="btn-more">
              <CiMenuKebab />
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderComponent;

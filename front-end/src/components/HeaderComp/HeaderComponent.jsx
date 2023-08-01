import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useNavigate } from "react-router-dom";

import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";

import "./HeaderComponent.scss";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false); // scrolled add className 'sticky-header'

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <div>
      <header className={`wrapper-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="inner">
          <div className="left" onClick={() => navigate("/")}>
            <div className="fires-image">
              <div className="fire" id="fire1"></div>
              <div className="fire" id="fire2"></div>
              <div className="fire" id="fire3"></div>
            </div>
            <div className="logo">anhtuan shop</div>
          </div>
          <div className="center">
            <input placeholder="Tìm kiếm sản phẩm..." spellCheck={false} />
            <button className="btn-search">
              <AiOutlineSearch />
            </button>
          </div>
          <div className="right">
            <Tippy
              interactive
              render={(attrs) => (
                <div className="tippy-popper" tabIndex="-1" {...attrs}>
                  <span>Đăng nhập</span>
                </div>
              )}
            >
              <span
                className="text-account"
                onClick={() => navigate("/sign-in")}
              >
                <VscAccount />
                tài khoản
              </span>
            </Tippy>

            <Tippy
              interactive
              render={(attrs) => (
                <div className="tippy-popper" tabIndex="-1" {...attrs}>
                  <span>Giỏ hàng</span>
                </div>
              )}
            >
              <div
                className="cart-icon"
                onClick={() => navigate("/productDetails")}
              >
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

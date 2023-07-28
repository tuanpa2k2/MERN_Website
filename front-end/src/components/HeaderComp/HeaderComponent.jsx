import React from "react";
import Tippy from "@tippyjs/react/headless";
import { useNavigate } from "react-router-dom";

import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";

import "./HeaderComponent.scss";

const HeaderComponent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="wrapper-header">
        <div className="inner">
          <div className="left" onClick={() => navigate("/")}>
            anhtuan shop
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

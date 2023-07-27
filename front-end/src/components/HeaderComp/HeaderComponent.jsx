import React from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";

import "./HeaderComponent.scss";

const HeaderComponent = () => {
  return (
    <div>
      <header className="wrapper-header">
        <div className="inner">
          <div className="left">anhtuan shop</div>
          <div className="center">
            <input placeholder="Tìm kiếm sản phẩm..." spellCheck={false} />
            <button className="btn-search">
              <AiOutlineSearch />
            </button>
          </div>
          <div className="right">
            <span className="text-account">
              <VscAccount />
              account
            </span>
            <div className="cart-icon">
              <AiOutlineShoppingCart />
              <span>5</span>
            </div>
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

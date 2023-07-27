import React from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsTiktok } from "react-icons/bs";

import "./NewLetterComponent.scss";

const NewLetterComponent = () => {
  return (
    <div className="wrapper-containerNewLetterComp">
      <div className="newsletter-content">
        <span className="big-text">
          hãy theo dõi chúng tôi để cập nhập nhiều sảng phẩm mới nhất
        </span>
        <div className="form">
          <input type="text" placeholder="Nhập địa chỉ email..." />
          <button>send mail</button>
        </div>
        <div className="text">Will be any more</div>
        <div className="social-icons">
          <BsFacebook />
          <BsInstagram />
          <BsTwitter />
          <BsTiktok />
        </div>
      </div>
    </div>
  );
};

export default NewLetterComponent;

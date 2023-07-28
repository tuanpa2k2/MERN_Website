import React, { useEffect } from "react";
import AOS from "aos";
import { BsFacebook, BsInstagram, BsTwitter, BsTiktok } from "react-icons/bs";

import "./NewLetterComponent.scss";

const NewLetterComponent = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="wrapper-containerNewLetterComp">
      <div className="newsletter-content">
        <span
          className="big-text"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
          hãy theo dõi chúng tôi để cập nhập nhiều sảng phẩm mới nhất
        </span>
        <div
          className="form"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
          <input type="text" placeholder="Nhập địa chỉ email..." />
          <button>send mail</button>
        </div>
        <div
          className="text"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
          Will be any more
        </div>
        <div
          className="social-icons"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
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

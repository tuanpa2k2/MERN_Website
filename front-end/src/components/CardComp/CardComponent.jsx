import React, { useEffect } from "react";
import AOS from "aos";

import product from "../../assets/images/product/OngVang.jpg";
import "./CardComponent.scss";

const CardComponent = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="bottom-bottom"
      data-aos-duration="2000"
      className="wrapper-cardComp"
    >
      <div className="thumb">
        <img src={product} alt="product" />
      </div>
      <div className="detail">
        <div className="name">Tên sảm phẩm</div>
        <div className="price">120.000 vnd</div>
        <div className="des">sản phẩm có chất lượng tốt, giá hợp lý</div>
      </div>
    </div>
  );
};

export default CardComponent;

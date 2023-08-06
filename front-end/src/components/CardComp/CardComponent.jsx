import React, { useEffect } from "react";
import AOS from "aos";
import { CiStar } from "react-icons/ci";

import product from "../../assets/images/product/OngVang.jpg";
import "./CardComponent.scss";

const CardComponent = (props) => {
  const { countInStock, description, image, name, price, rating, type, discount, selled } = props;

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
        <div className="name">{name}</div>
        <div className="price-container">
          <div className="price">đ{price}</div>
          <p>-</p>
          <div className="price-discount">đ{price}</div>
        </div>
        <div className="star-container">
          <div className="rating">{rating}</div>
          <div className="icon-star">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        </div>
        <div className="quantity">
          <div className="countInStock">Số lượng: {countInStock}</div>
          <p>-</p>
          <div className="selled">Đã bán 500</div>
        </div>
        {/* <div className="des">{description}</div> */}
      </div>
    </div>
  );
};

export default CardComponent;

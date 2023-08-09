import React, { useEffect } from "react";
import AOS from "aos";
import { CiStar } from "react-icons/ci";
import "./CardComponent.scss";

const CardComponent = (props) => {
  const { countInStock, image, name, price, rating, type, discount, selled } = props;

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div data-aos="fade-up" data-aos-duration="2000" className="wrapper-cardComp">
      <div className="thumb">{props.image && <img src={image} alt="product" />}</div>
      <div className="detail">
        <div className="name">{name}</div>
        <div className="price-container">
          <div className="price">${price}</div>
          <p>-</p>
          <div className="price-discount">${discount || 0}</div>
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
          <div className="selled">Đã bán {selled || 0}</div>
        </div>
        <div className="type">Thể loại: {type}</div>
      </div>
    </div>
  );
};

export default CardComponent;

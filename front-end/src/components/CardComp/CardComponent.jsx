import React, { useEffect } from "react";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

import "./CardComponent.scss";
import { Rate } from "antd";

const CardComponent = (props) => {
  const { countInStock, image, name, price, rating, type, discount, selled, id } = props;
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleDetailProduct = (id) => {
    navigate(`/productDetails/${id}`);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2000"
      className="wrapper-cardComp"
      onClick={() => handleDetailProduct(id)}
    >
      <div className="thumb">{props.image && <img src={image} alt="product" />}</div>
      <div className="detail">
        <div className="name">{name}</div>
        <div className="price-container">
          <div className="price">{price.toLocaleString()} vnđ</div>
          <div className="price-discount">{discount || 0}%</div>
        </div>
        <div className="star-container">
          <div className="rating">{rating}</div>
          <Rate disabled defaultValue={rating} value={rating} />
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

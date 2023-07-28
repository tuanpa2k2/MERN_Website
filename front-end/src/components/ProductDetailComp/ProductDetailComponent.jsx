import React from "react";

import { AiOutlineShoppingCart, AiOutlineMinusCircle } from "react-icons/ai";
import { CiMoneyCheck1, CiLocationOn } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoPlusCircle } from "react-icons/go";

import prod from "../../assets/images/product/naruto.jpg";

import "./ProductDetailComponent.scss";

const ProductDetailComponent = () => {
  return (
    <div className="wrapper-productComp">
      <div className="col-left">
        <div className="img-big">
          <img src={prod} alt="prod" />
        </div>
        <div className="img-small">
          <div className="img-children">
            <img src={prod} alt="prod" />
          </div>
          <div className="img-children">
            <img src={prod} alt="prod" />
          </div>
          <div className="img-children">
            <img src={prod} alt="prod" />
          </div>
          <div className="img-children">
            <img src={prod} alt="prod" />
          </div>
        </div>
      </div>
      <div className="col-right">
        <div className="title-name">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          dignissimos illum quod, suscipit doloribus id, quasi fugiat vero eaque
          a quis! Eaque rem exercitationem nulla, itaque qui expedita odio
          rerum?
        </div>
        <div className="price">
          <h4>Giá bán:</h4>
          <span className="price-number">
            6.000.000 <p>vnd</p>
          </span>
        </div>
        <div className="quantity">
          <h4>Số lượng:</h4>
          <div className="action-quantity">
            <button className="minus">
              <AiOutlineMinusCircle />
            </button>
            <input className="input-text" type="text" value="1" />
            <button className="plus">
              <GoPlusCircle />
            </button>
          </div>
        </div>
        <div className="description">
          <h4>Mô tả:</h4>
          <p className="content-des">
            CHI TIẾT SẢN PHẨM : Thắt lưng nam, Thắt lưng da, Dây nịt nam, Dây
            lưng nam - Kiểu khóa: Khóa tự động- răng cài khóa - Mặt khóa thiết
            kế gọn, làm bằng hợp kim Nano chống xước , dễ sử dụng để bạn thoải
            mái hơn khi cài. - Kích thước dây: Chiều rộng 3cm - Chiều dài dây
            115 cm
          </p>
        </div>
        <div className="location">
          <h4>Vận chuyển:</h4>
          <div className="content-location">
            <div className="send-location">
              <div className="icons">
                <CiLocationOn />
                gửi từ
              </div>
              <span>Thuần Thành, huyện Thái Thụy - Thái Bình.</span>
            </div>
            <div className="receive-location">
              <div className="icons">
                <LiaShippingFastSolid />
                gửi đến
              </div>
              <span>
                số 8, ngõ 144/4 Quan Nhân, phường Nhân Chính, Thanh Xuân - Hà
                Nội.
              </span>
            </div>
          </div>
        </div>
        <div className="btn-action">
          <button className="add-to-card">
            <AiOutlineShoppingCart />
            Thêm vào giỏ hàng
          </button>
          <button className="buy-now">
            <CiMoneyCheck1 />
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;

import React from "react";
import { BsCardChecklist } from "react-icons/bs";
import prod from "../../assets/images/product/book.jpg";
import "./DetailOrderPage.scss";

const DetailOrderPage = () => {
  return (
    <div className="wrapper-detailOrderPage">
      <div className="header-title">
        <BsCardChecklist />
        <span>Chi tiết đơn hàng ...</span>
      </div>
      <div className="content-details">
        <div className="info-details">
          <div className="diachi">
            <div className="title-textt">Địa chỉ người nhận</div>
            <div className="info-text">
              <div className="name">Phi Anh Tuan</div>
              <div className="address">Thái thụy - thái bình ...</div>
              <div className="phone">
                (+84) <p>365269311</p>
              </div>
            </div>
          </div>
          <div className="giaohang">
            <div className="title-textt">Hình thức giao hàng</div>
            <div className="info-text">
              <div className="fast">
                <p>FAST</p> Giao hàng tiết kiệm
              </div>
              <div className="delivery">
                Phí giao hàng: <p>20,000 vnd</p>
              </div>
            </div>
          </div>
          <div className="thanhtoan">
            <div className="title-textt">Hình thức thanh toán</div>
            <div className="info-text">
              <div className="name">Thanh toán khi nhận hàng</div>
              <div className="status">
                Trạng thái: <p>Chưa thanh toán</p>
              </div>
            </div>
          </div>
        </div>
        <div className="product-details">
          <div className="image">
            <img src={prod} alt="imagess" />
          </div>
          <div className="info-product">
            <div className="name">
              name product Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda asperiores temporibus
              nihil, consequatur doloremque quod culpa obcaecati velit laboriosam porro ipsam saepe voluptatum facere
              eius delectus. Dolor totam nam quasi!
            </div>
            <div className="quantity">
              <p>Số lượng:</p> <span style={{ fontStyle: "oblique" }}>x5</span>
            </div>
            <div className="price">
              <p>Giá:</p> <span style={{ color: "blue" }}>120,000 vnd</span>
            </div>
            <div className="discount">
              <p>Giảm giá:</p> <span style={{ color: "red" }}>20%</span>
            </div>
          </div>
          <div className="price-container">
            <div className="text-title">Chi tiết các khoản</div>
            <div className="acbkkkk">
              <div className="tam-tinh">
                Tạm tính: <p>0 vnd</p>
              </div>
              <div className="delivery">
                Phí vận chuyển: <p>0 vnd</p>
              </div>
              <div className="thue">
                Thuế: <p>0 vnd</p>
              </div>
              <div className="space"></div>
              <div className="total-price">
                Tổng tiền thanh toán: <p>0 vnd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderPage;

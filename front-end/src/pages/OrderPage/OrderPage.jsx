import React from "react";
import { FcShipped } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";

import prod from "../../assets/images/product/book.jpg";
import "./OrderPage.scss";
import { Checkbox } from "antd";

const OrderPage = () => {
  return (
    <div className="wrapper-containerOrderPage">
      <div className="header-title">
        <FcShipped />
        <span>
          Giỏ hàng của bạn<p>- vui lòng kiểm tra kĩ thông tin trước khi mua nhé... 🥰🥰🥰</p>
        </span>
      </div>
      <div className="detail-behind">
        <div className="left">
          <div className="selected-table">
            <div className="input-action">
              {/* <input type="checkbox" /> */}
              <Checkbox />
            </div>
            <div className="texttttt">Tất cả giỏ hàng có (10 sản phẩm)</div>
          </div>

          <div className="header-table">
            <div className="input-action">
              {/* <input type="checkbox" /> */}
              <Checkbox />
            </div>
            <div className="image-product">Hình ảnh</div>
            <div className="name-product">Tên sản phẩm</div>
            <div className="quantity-product">Số lượng</div>
            <div className="price-product">Đơn giá (vnd)</div>
            <div className="total-product">Tổng (vnd)</div>
            <div className="action">Xóa</div>
          </div>

          <div className="kkkkkkk">
            <div className="content-table">
              <div className="input-action">
                {/* <input type="checkbox" /> */}
                <Checkbox />
              </div>
              <div className="image">
                <img src={prod} alt="" />
              </div>
              <div className="name">Te sản phẩm v n phẩm ên sản phẩm v</div>
              <div className="quantity">
                <div className="abcd">
                  <button className="btn-decrease">-</button>
                  <input type="text" />
                  <button className="btn-increase">+</button>
                </div>
              </div>
              <div className="price">200.000</div>
              <div className="total">1.000.000</div>
              <div className="action">
                <RiDeleteBin6Line />
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="title-order">Anhtuan shop</div>
          <div className="details-order">
            <div className="info-employee">
              <div className="label-order">Thông tin người bán</div>
              <div className="details-infoEmployee">
                <div className="name">
                  <div className="name-label">Họ và tên:</div>
                  <div className="name-info">Phi anh tuan</div>
                </div>
                <div className="address">
                  <div className="name-label">Địa chỉ:</div>
                  <div className="name-info">Thôn thanh xuân, xã thuần thành, thái thụy - thái bình</div>
                </div>
                <div className="phone">
                  <div className="name-label">Số điện thoại:</div>
                  <div className="name-info" style={{ fontWeight: "500" }}>
                    036 526 9311
                  </div>
                </div>
              </div>
              <hr />
            </div>

            <div className="info-buyer">
              <div className="label-order">Thông tin người mua hàng</div>
              <div className="details-infobuyer">
                <div className="name">
                  <div className="name-label">Họ và tên:</div>
                  <div className="name-info">Nguyễn Thị Huyền</div>
                </div>
                <div className="address">
                  <div className="name-label">Địa chỉ:</div>
                  <div className="name-info">thái ha, thái thụy - thái bình</div>
                </div>
                <div className="phone">
                  <div className="name-label">Số điện thoại:</div>
                  <div className="name-info" style={{ fontWeight: "500" }}>
                    036 526 9311
                  </div>
                </div>
              </div>
              <hr />
            </div>

            <div className="info-order">
              <div className="label-order">Chi tiết hóa đơn thanh toán</div>
              <div className="details-price">
                <div className="row-1">
                  <div className="name-label">Tạm tính:</div>
                  <div className="price-order">0 vnđ</div>
                </div>
                <div className="row-2">
                  <div className="name-label">Giảm giá:</div>
                  <div className="price-order">0 vnđ</div>
                </div>
                <div className="row-3">
                  <div className="name-label">Thuế:</div>
                  <div className="price-order">0 vnđ</div>
                </div>
                <div className="row-4">
                  <div className="name-label">Phí giao hàng:</div>
                  <div className="price-order">0 vnđ</div>
                </div>
                <hr />
                <div className="row-5">
                  <div className="name-label">Tổng tiền:</div>
                  <div className="total-price">0 vnđ</div>
                </div>
              </div>
            </div>
          </div>
          <button>Thanh Toán</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

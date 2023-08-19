import React, { useEffect, useMemo, useState } from "react";
import { FcShipped } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCartX } from "react-icons/bs";

import "./OrderPage.scss";
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeOrderProduct,
  removeOrderProductAll,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import * as message from "../../components/MessageComp/MessageComponent";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { convertPrice } from "../../until";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listChecked, setListChecked] = useState([]);

  const onchangeCheckbox = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value);
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const onchangeCheckboxAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((element) => {
        newListChecked.push(element?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  // Xử lý phần order thanh toán -----------------------------------------------------------------------------------------
  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);

    return result;
  }, [order]);

  const discountPriceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.discount * cur.amount;
    }, 0);

    if (Number(result)) {
      return result;
    } else {
      return 0;
    }
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 200000) {
      return 10000;
    } else if (priceMemo === 0) {
      return 0;
    }
    return 20000;
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(discountPriceMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, discountPriceMemo, diliveryPriceMemo]);

  // Xử lý phần handle -----------------------------------------------------------------------------------------
  const handleOnchangeCount = (type, idProduct) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
    }
  };

  const handleDeleteProduct = (idProduct) => {
    message.success("Xóa sản phẩm thành công!");
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleDeleteProductAll = () => {
    if (listChecked?.length > 0) {
      message.success("Xóa sản phẩm thành công!");
      dispatch(removeOrderProductAll({ listChecked }));
    }
  };

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
              <Checkbox onChange={onchangeCheckboxAll} checked={listChecked?.length === order?.orderItems?.length} />
            </div>
            <div className="texttttt">
              Tất cả giỏ hàng có <p>{order?.orderItems?.length}</p> sản phẩm
            </div>
            {listChecked?.length > 0 && (
              <div className="btn-deleteAll" onClick={handleDeleteProductAll}>
                <button>
                  <RiDeleteBin6Line /> <p>Xóa tất cả</p>
                </button>
              </div>
            )}
          </div>

          <div className="header-table">
            <div className="input-action">#</div>
            <div className="image-product">Hình ảnh</div>
            <div className="name-product">Tên sản phẩm</div>
            <div className="quantity-product">Số lượng</div>
            <div className="price-product">Đơn giá</div>
            <div className="total-product">Tổng</div>
            <div className="action">Xóa</div>
          </div>

          <div className="kkkkkkk">
            {order?.orderItems?.length ? (
              order?.orderItems?.map((iten) => {
                console.log("iten", iten);
                return (
                  <div className="content-table" key={iten?.product}>
                    <div className="input-action">
                      <Checkbox
                        onChange={onchangeCheckbox}
                        value={iten?.product}
                        checked={listChecked.includes(iten?.product)}
                      />
                    </div>
                    <div className="image">
                      <img src={iten?.image} alt="" />
                    </div>
                    <div className="name">{iten?.name}</div>
                    <div className="quantity">
                      <div className="abcd">
                        <button className="btn-decrease" onClick={() => handleOnchangeCount("decrease", iten?.product)}>
                          -
                        </button>
                        <input type="text" value={iten?.amount} />
                        <button className="btn-increase" onClick={() => handleOnchangeCount("increase", iten?.product)}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="price">{convertPrice(iten?.price)}</div>
                    <div className="total">{convertPrice(iten?.price * iten?.amount)}</div>
                    <Tippy content="Xóa">
                      <div className="action">
                        <RiDeleteBin6Line onClick={() => handleDeleteProduct(iten?.product)} />
                      </div>
                    </Tippy>
                  </div>
                );
              })
            ) : (
              <div className="card-empty">
                <span>Giỏ hàng của bạn chưa có sản phẩm nào...</span>
                <BsCartX />
                <button onClick={() => navigate("/")}>Về Trang Chủ</button>
              </div>
            )}
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
                  <div className="price-order">{convertPrice(priceMemo)}</div>
                </div>
                <div className="row-2">
                  <div className="name-label">Giảm giá:</div>
                  <div className="price-order">{discountPriceMemo} %</div>
                </div>
                <div className="row-4">
                  <div className="name-label">Phí giao hàng:</div>
                  <div className="price-order">{convertPrice(diliveryPriceMemo)}</div>
                </div>
                <hr />
                <div className="row-5">
                  <div className="name-label">Tổng tiền:</div>
                  <div className="total-price">{convertPrice(totalPriceMemo)}</div>
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

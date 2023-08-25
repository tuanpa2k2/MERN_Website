import React from "react";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import { RiSecurePaymentLine } from "react-icons/ri";

import "./MyOrderPage.scss";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import { convertPrice } from "../../until";
const MyOrderPage = () => {
  const user = useSelector((state) => state.user);

  const fetchMyOrderDetails = async () => {
    // if (user?.id && user?.access_token) {
    // }
    const res = await OrderService.getOrderByUserId(user?.id, user?.access_token);
    return res.data;
  };

  const queryOrder = useQuery(["users"], fetchMyOrderDetails, {
    retry: 3,
    retryDelay: 1000,
  });
  const { data, isLoading: isLoadingMyOrdert } = queryOrder;
  console.log("data", data);

  return (
    <LoadingComponent isLoading={isLoadingMyOrdert}>
      <div className="wrapper-myOrderPage">
        <div className="header-title">
          <RiSecurePaymentLine />
          <span>Đơn hàng của tôi 🥰🥰🥰</span>
        </div>

        <div className="details-myorder">
          {data?.orderItems?.map((items) => {
            return (
              <div className="label-product" key={items?._id}>
                <div className="image-prod">
                  <img src={items?.image} alt="imge" />
                </div>
                <div className="details-product">
                  <div className="name-product">{items?.name}</div>
                  <div className="quantity">Số lượng: {items?.amount}</div>
                  <div className="price">Giá bán: {convertPrice(items?.price)}</div>
                  <div className="total-price">
                    Tổng tiền: <p>{convertPrice(data?.totalPrice)}</p>
                  </div>
                </div>
                <div className="actions">
                  <div className="text-status">
                    <div className="trangthai">Trạng thái đơn hàng</div>
                    <div className="chitiet">
                      <div className="giaohang">
                        Giao hàng: <p>{`${items?.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}`}</p>
                      </div>
                      <div className="thanhtoan">
                        Thanh toán: <p>{`${items?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}`}</p>
                      </div>
                    </div>
                  </div>
                  <button className="xemchitiet">Xem chi tiết</button>
                  <button className="huydon">Hủy đơn hàng</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </LoadingComponent>
  );
};

export default MyOrderPage;

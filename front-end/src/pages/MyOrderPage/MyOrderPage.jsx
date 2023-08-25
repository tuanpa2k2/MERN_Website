import React from "react";
import * as OrderService from "../../services/OrderService";
import { RiSecurePaymentLine } from "react-icons/ri";

import "./MyOrderPage.scss";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import { convertPrice } from "../../until";
import { useLocation } from "react-router-dom";
const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;

  const fetchMyOrderDetails = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.access_token);
    return res.data;
  };

  const queryOrder = useQuery(
    { queryKey: ["orders"], queryFn: fetchMyOrderDetails },
    {
      enabled: state?.id && state?.access_token,
    }
  );
  const { data: dataOrder, isLoading: isLoadingMyOrdert } = queryOrder;

  const renderProduct = (data, price, shipping) => {
    if (data?.length > 1) {
      return data?.map((items) => {
        return (
          <div className="prod-sonhieu" key={items?.product}>
            <div className="image-prod">
              <img src={items?.image} alt="imge" />
            </div>
            <div className="details-product">
              <div className="name-product">{items?.name}</div>
              <div className="quantity">Số lượng: {items?.amount}</div>
              <div className="price">Giá bán: {convertPrice(items?.price)}</div>
              <div className="price">Shiping: {convertPrice(shipping)}</div>
              <div className="total-price">
                Tổng tiền: <p>{convertPrice(price)}</p>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return data?.map((items) => {
        return (
          <div className="prod-soit" key={items?.product}>
            <div className="image-prod">
              <img src={items?.image} alt="imge" />
            </div>
            <div className="details-product">
              <div className="name-product">{items?.name}</div>
              <div className="quantity">Số lượng: {items?.amount}</div>
              <div className="price">Giá bán: {convertPrice(items?.price)}</div>
              <div className="price">Shiping: {convertPrice(shipping)}</div>
              <div className="total-price">
                Tổng tiền: <p>{convertPrice(price)}</p>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <LoadingComponent isLoading={isLoadingMyOrdert}>
      <div className="wrapper-myOrderPage">
        <div className="header-title">
          <RiSecurePaymentLine />
          <span>Đơn hàng của tôi 🥰🥰🥰</span>
        </div>

        <div className="details-myorder">
          {dataOrder?.map((items) => {
            console.log("itemss", items);
            return (
              <div className="label-product" key={items?._id}>
                <div className="product-render">
                  {renderProduct(items?.orderItems, items?.totalPrice, items?.shippingPrice)}
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

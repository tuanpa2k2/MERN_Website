import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BsCardChecklist } from "react-icons/bs";
import { LiaShippingFastSolid, LiaMapMarkedSolid } from "react-icons/lia";
import { FaAmazonPay } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { convertPrice } from "../../until";
import { orderContant } from "../../contant";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";

import "./DetailOrderPage.scss";

const DetailOrderPage = () => {
  const params = useParams(); // lấy id được truyền đi ở MyOrderPage có trong useParams
  const location = useLocation();
  const { id } = params;
  const { state } = location;

  const fetchOrderDetails = async () => {
    const res = await OrderService.getOrderDetailId(id, state.token);
    return res.data;
  };

  const queryOrderDetail = useQuery(
    { queryKey: ["orders-details"], queryFn: fetchOrderDetails },
    {
      enabled: state?.id && state?.access_token,
    }
  );
  const { data, isLoading } = queryOrderDetail;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);

    return result;
  }, [data]);

  const diliveryPriceMemo = useMemo(() => {
    if ((priceMemo === 0 && data?.orderItems.length === 0) || priceMemo >= 1000000) {
      return 0;
    } else if (500000 <= priceMemo && priceMemo < 1000000) {
      return 10000;
    } else if (200000 <= priceMemo && priceMemo < 500000) {
      return 20000;
    } else if (priceMemo < 200000) {
      return 30000;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceMemo]);

  return (
    <div className="wrapper-detailOrderPage">
      <div className="header-title">
        <BsCardChecklist />
        <span>
          Chi tiết đơn hàng: <p>{id}</p>
        </span>
      </div>
      <LoadingComponent isLoading={isLoading}>
        <div className="content-details">
          <div className="info-details">
            <div className="diachi">
              <div className="title-textt">
                <LiaMapMarkedSolid />
                Thông tin người nhận
              </div>
              <div className="info-text">
                <div className="name">{data?.shippingAddress?.fullName}</div>
                <div className="address">{`${data?.shippingAddress?.address} - ${data?.shippingAddress?.city}`}</div>
                <div className="phone">
                  (+84) <p>{data?.shippingAddress?.phone}</p>
                </div>
              </div>
            </div>
            <div className="giaohang">
              <div className="title-textt">
                <LiaShippingFastSolid /> Hình thức giao hàng
              </div>
              <div className="info-text">
                <div className="fast">
                  <p>FAST</p> Giao hàng tiết kiệm
                </div>
                <div className="delivery">
                  Phí giao hàng: <p>{convertPrice(diliveryPriceMemo)}</p>
                </div>
              </div>
            </div>
            <div className="thanhtoan">
              <div className="title-textt">
                <FaAmazonPay />
                Hình thức thanh toán
              </div>
              <div className="info-text">
                <div className="name">{orderContant.payment[data?.paymentMethod]}</div>
                <div className="status">
                  Trạng thái: <p>{data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="product-details">
            {data?.orderItems?.length === 1
              ? data?.orderItems?.map((items) => {
                  return (
                    <div className="sanphamsoit" key={items?._id}>
                      <div className="image">
                        <img src={items?.image} alt="imagess" />
                      </div>
                      <div className="info-product">
                        <div className="name">{items?.name}</div>
                        <div className="quantity">
                          <p>- Số lượng:</p> <span style={{ fontStyle: "oblique" }}>x{items?.amount}</span>
                        </div>
                        <div className="price">
                          <p>- Giá:</p> <span style={{ color: "blue" }}>{convertPrice(items?.price)}</span>
                        </div>
                        <div className="discount">
                          <p>- Giảm giá:</p> <span style={{ color: "blue" }}>0%</span>
                        </div>
                        <div className="discount">
                          <p>- Tổng tiền:</p>
                          <span style={{ color: "red" }}>{convertPrice(items?.price * items?.amount)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : data?.orderItems?.map((items) => {
                  return (
                    <div className="sanphamsonhieu" key={items?._id}>
                      <div className="image">
                        <img src={items?.image} alt="imagess" />
                      </div>
                      <div className="info-product">
                        <div className="name">{items?.name}</div>
                        <div className="quantity">
                          <p>- Số lượng:</p> <span style={{ fontStyle: "oblique" }}>x{items?.amount}</span>
                        </div>
                        <div className="price">
                          <p>- Giá:</p> <span style={{ color: "blue" }}>{convertPrice(items?.price)}</span>
                        </div>
                        <div className="discount">
                          <p>- Giảm giá:</p> <span style={{ color: "blue" }}>0%</span>
                        </div>
                        <div className="discount">
                          <p>- Tổng tiền:</p>
                          <span style={{ color: "red" }}>{convertPrice(items?.price * items?.amount)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

            <div className="price-container">
              <div className="text-title">Chi tiết các khoản</div>
              <div className="acbkkkk">
                {data?.orderItems?.map((item) => {
                  return (
                    <div className="name-product" key={item._id}>
                      <div className="ten">* {item?.name}</div>
                      <div className="gia">{convertPrice(item?.price * item?.amount)}</div>
                    </div>
                  );
                })}

                <div className="tam-tinh">
                  Tạm tính: <p>{convertPrice(priceMemo)}</p>
                </div>
                <div className="delivery">
                  Phí vận chuyển: <p>{convertPrice(diliveryPriceMemo)}</p>
                </div>
                <div className="thue">
                  Thuế: <p>0 vnd</p>
                </div>
                <div className="space"></div>
                <div className="total-price">
                  Tổng tiền thanh toán: <p>{convertPrice(data?.totalPrice)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingComponent>
    </div>
  );
};

export default DetailOrderPage;

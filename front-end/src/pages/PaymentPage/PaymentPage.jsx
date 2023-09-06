import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Radio } from "antd";

import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import * as message from "../../components/MessageComp/MessageComponent";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import ModalComponent from "../../components/ModalComp/ModalComponent";
import { convertPrice } from "../../until";
import "./PaymentPage.scss";
import { removeOrderProductAll } from "../../redux/slides/orderSlide";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payment, setPayment] = useState("later_money");
  const [delivery, setDelivery] = useState("fast");

  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  // -----------------------------------------------------------------------------------------------------------------------------
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, token, rests);

    return res;
  });
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder(token, rests);

    return res;
  });

  // -----------------------------------------------------------------------------------------------------------------------------
  const { data: dataUpdated, isSuccess: isSuccessUpdated, isLoading: isLoadingUpdated } = mutationUpdate;
  const { data: dataAddOrdered, isSuccess: isSuccessAddOrdered } = mutationAddOrder;

  // -----------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  useEffect(() => {
    if (isModalOpen) {
      setStateUserDetail({
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
        city: user?.city,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhập nguời dùng thành công");
      handleCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isSuccessAddOrdered && dataAddOrdered?.status === "OK") {
      // Khi đặt hàng thành công thì sẽ xóa giỏ hàng
      const arrOrdered = [];
      order?.orderItemsSelected?.forEach((element) => {
        arrOrdered.push(element.product);
      });
      dispatch(removeOrderProductAll({ listChecked: arrOrdered }));

      message.success("Đặt hàng thành công...");
      // Truyền các state khi đặt hàng thành công vào location
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSelected,
          totalDiscount: discountPriceMemo,
          totalPriceMemo: totalPriceMemo,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessAddOrdered]);

  // Xử lý phần order thanh toán -----------------------------------------------------------------------------------------
  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);

    return result;
  }, [order]);

  const discountPriceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0;
      return total + (priceMemo * (totalDiscount * cur.amount)) / 100;
    }, 0);

    if (Number(result)) {
      return result;
    } else {
      return 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo === 0 && priceMemo >= 1000000) {
      return 0;
    } else if (500000 <= priceMemo) {
      return 10000;
    } else if (200000 <= priceMemo) {
      return 20000;
    } else {
      return 30000;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(discountPriceMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, discountPriceMemo, diliveryPriceMemo]);

  // Xử lý phần handle -----------------------------------------------------------------------------------------
  const handleOnchangeDetails = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAddress = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUserDetail({
      name: "",
      phone: "",
      address: "",
      city: "",
    });
    form.resetFields();
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleDilivery = (e) => {
    setDelivery(e.target.value);
  };

  // Xử lý phần mutate -----------------------------------------------------------------------------------------
  const handleUpdateInfoUser = () => {
    const { name, phone, address, city } = stateUserDetail;

    if (name && phone && address && city) {
      mutationUpdate.mutate(
        {
          id: user?.id,
          token: user?.access_token,
          ...stateUserDetail,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    }
  };
  const handleAddOrderPayment = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.phone &&
      user?.address &&
      user?.city &&
      user?.id &&
      priceMemo
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
      });
    }
  };

  return (
    <div className="wrapper-containerPaymentPage">
      <div className="header-title">
        <RiSecurePaymentLine />
        <span>
          Xác nhận thanh toán<p>- vui lòng kiểm tra kĩ thông tin trước khi mua nhé... 🥰🥰🥰</p>
        </span>
      </div>
      <div className="detail-behind">
        <div className="left">
          <div className="container-rafce">
            <div className="text-label">Chọn phương thức giao hàng</div>
            <div className="select-radio">
              <Radio.Group onChange={handleDilivery} value={delivery}>
                <Radio value="fast">
                  <span className="abcd">FAST</span> Giao hàng tiết kiệm
                </Radio>
                <Radio value="goject">
                  <span className="abcd">GO_JECT</span> Giao hàng nhanh
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="container-rafce">
            <div className="text-label">Chọn phương thức thanh toán</div>
            <div className="select-radio">
              <Radio.Group onChange={handlePayment} value={payment}>
                <Radio value="later_money">Thanh toán khi nhận hàng</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="title-payment">Anhtuan shop</div>
          <div className="details-payment">
            <div className="info-buyer">
              <div className="label-payment">Thông tin người mua hàng</div>
              <div className="details-infobuyer">
                <div className="name">
                  <div className="name-label">Họ và tên:</div>
                  <div className="name-info">{user?.name}</div>
                </div>
                <div className="phone">
                  <div className="name-label">Số điện thoại:</div>
                  <div className="name-info" style={{ fontWeight: "500" }}>
                    {user?.phone}
                  </div>
                </div>
                <div className="address">
                  <div className="name-label">Địa chỉ nhận:</div>
                  <div className="name-info">{`${user?.address} - ${user?.city}`}</div>
                </div>
                <div className="change-address" onClick={handleChangeAddress}>
                  Thay đổi địa chỉ
                </div>
              </div>
              <hr />
            </div>

            <div className="info-product">
              <div className="label-payment">Danh sách các sản phẩm</div>
              <div className="details-infoproduct">
                {order.orderItems.map((items) => {
                  return (
                    <div className="name" key={items?.product}>
                      <div className="name-product">* {items?.name}</div>
                      <div className="price-product">{convertPrice(items?.price)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="info-payment">
            <div className="label-payment">Chi tiết hóa đơn thanh toán</div>
            <div className="details-prices">
              <div className="row-1">
                <div className="name-label">Tạm tính:</div>
                <div className="price-order">{convertPrice(priceMemo)}</div>
              </div>
              <div className="row-2">
                <div className="name-label">Giảm giá:</div>
                <div className="price-order" style={{ color: "blue" }}>
                  -{convertPrice(discountPriceMemo)}
                </div>
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
            <button onClick={() => handleAddOrderPayment()}>Thanh Toán</button>
          </div>
        </div>
      </div>

      {/*-------------------------------------------------------------------------------- */}
      <ModalComponent
        title="Cập nhập thông tin giao hàng"
        forceRender
        open={isModalOpen}
        onCancel={handleCancel}
        // okButtonProps={{ style: { display: "none" } }} // Ẩn button OK trong ant design
        onOk={handleUpdateInfoUser}
      >
        <LoadingComponent isLoading={isLoadingUpdated}>
          <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} autoComplete="on" form={form}>
            <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
              <Input name="name" value={stateUserDetail.name} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input name="phone" value={stateUserDetail.phone} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Tỉnh (thành phố)"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input name="city" value={stateUserDetail.city} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Chi tiết địa chỉ"
              name="address"
              rules={[{ required: true, message: "Please input your address!" }]}
            >
              <Input name="address" value={stateUserDetail.address} onChange={handleOnchangeDetails} />
            </Form.Item>

            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Cập nhập
                </Button>
              </Form.Item> */}
          </Form>
        </LoadingComponent>
      </ModalComponent>
    </div>
  );
};

export default PaymentPage;

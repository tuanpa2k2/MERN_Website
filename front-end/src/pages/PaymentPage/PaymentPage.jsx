import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Form, Input, Radio } from "antd";

import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import * as message from "../../components/MessageComp/MessageComponent";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import ModalComponent from "../../components/ModalComp/ModalComponent";
import { convertPrice } from "../../until";
import "./PaymentPage.scss";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const navigate = useNavigate();

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
      message.success("Đặt hàng thành công...");
      navigate("/");
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
    <div className="wrapper-containerOrderPage">
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
          <div className="title-order">Anhtuan shop</div>
          <div className="details-order">
            <div className="info-buyer">
              <div className="label-order">Thông tin người mua hàng</div>
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
                  Đổi địa chỉ
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
          <button onClick={() => handleAddOrderPayment()}>Thanh Toán</button>
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

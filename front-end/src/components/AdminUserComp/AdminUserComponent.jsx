import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineSetting } from "react-icons/ai";
import TableComponent from "../TableComp/TableComponent";
import { AiOutlineCloudUpload } from "react-icons/ai";

import "./AdminUserComponent.scss";
import ModalComponent from "../ModalComp/ModalComponent";
import { Button, Form, Input, Upload } from "antd";
import { getBase64 } from "../../until";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComp/MessageComponent";
import LoadingComponent from "../LoadingComp/LoadingComponent";

const AdminUserComponent = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    phone: "",
    address: "",
    avatar: "",
  });

  // -----------------------------------------------------------------------------------------------------------------------
  const mutationCreate = useMutationHooks((data) => {
    const { name, email, password, confirmPassword, isAdmin, phone, address, avatar } = data;
    const res = UserService.createUser({ name, email, password, confirmPassword, isAdmin, phone, address, avatar });

    return res;
  });

  // -----------------------------------------------------------------------------------------------------------------------
  const { data, isSuccess: isSuccessCreate, isLoading: isLoadingCreate } = mutationCreate;

  useEffect(() => {
    if (isLoadingCreate && data?.status === "OK") {
      handleCancel();
      message.success("Thêm nguời dùng thành công");
    }
  }, [isSuccessCreate]);

  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateUser({
      ...stateUser,
      avatar: file.preview,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
      phone: "",
      address: "",
      avatar: "",
    });

    form.resetFields();
  };

  // Nhận và xử lý mutate() trong react-query ------------------------------------------------------
  const onFinish = () => {
    mutationCreate.mutate(stateUser);
  };
  return (
    <div className="wapper-adminUserComp">
      <div className="right-content-header">
        <h3>
          <AiOutlineSetting />
          Quản lý thông tin người dùng
        </h3>
        <button onClick={() => setIsModalOpen(true)}>
          <AiOutlinePlusCircle />
          Thêm mới người dùng
        </button>
      </div>
      <div className="right-content-table">
        <TableComponent />
      </div>

      {/* --------------------------------------------------------------------------------------- */}
      <ModalComponent
        title="Tạo mới người dùng"
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }} // Ẩn button OK trong ant design
        centered
      >
        <LoadingComponent isLoading={isLoadingCreate}>
          <Form>
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              initialValues={{ remember: true }}
              autoComplete="on"
              form={form}
            >
              <Form.Item label="Email truy cập" name="email">
                <Input
                  type="email"
                  name="email"
                  value={stateUser.email}
                  onChange={handleOnchange}
                  placeholder="vd: abc@gmail.com"
                />
              </Form.Item>

              <Form.Item label="Mật khẩu" name="password">
                <Input
                  type="password"
                  name="password"
                  value={stateUser.password}
                  onChange={handleOnchange}
                  placeholder="..."
                />
              </Form.Item>

              <Form.Item label="Nhập lại mật khẩu" name="confirmPassword">
                <Input
                  type="password"
                  name="confirmPassword"
                  value={stateUser.confirmPassword}
                  onChange={handleOnchange}
                  placeholder="..."
                />
              </Form.Item>

              <Form.Item label="Quyền truy cập" name="isAdmin">
                <Input
                  name="isAdmin"
                  value={stateUser.isAdmin}
                  onChange={handleOnchange}
                  placeholder="false or true (default: false)"
                />
              </Form.Item>

              <Form.Item label="Tên người dùng" name="name">
                <Input name="name" value={stateUser.name} onChange={handleOnchange} placeholder="..." />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phone">
                <Input name="phone" value={stateUser.phone} onChange={handleOnchange} placeholder="..." />
              </Form.Item>

              <Form.Item label="Thông tin địa chỉ" name="address">
                <Input name="address" value={stateUser.address} onChange={handleOnchange} placeholder="..." />
              </Form.Item>

              <Form.Item label="Hình ảnh sản phẩm" name="avatar">
                <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                  <Button icon={<AiOutlineCloudUpload />}>Chọn file ảnh của bạn</Button>
                </Upload>
                {stateUser?.avatar && (
                  <div className="image-modal">
                    <img src={stateUser?.avatar} alt="avatar" />
                  </div>
                )}
              </Form.Item>

              <Form.Item name="button-submit" wrapperCol={{ offset: 8, span: 16 }}>
                <div
                  onClick={onFinish}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    border: "1px solid blue",
                    padding: "5px 0",
                    borderRadius: "8px",
                    fontSize: "1.7rem",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Tạo người dùng
                </div>
              </Form.Item>
            </Form>
          </Form>
        </LoadingComponent>
      </ModalComponent>
    </div>
  );
};

export default AdminUserComponent;

import React, { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineSetting, AiOutlineCloudUpload } from "react-icons/ai";
import TableComponent from "../TableComp/TableComponent";

import "./AdminProductComponent.scss";
import { Button, Form, Input, Modal, Upload } from "antd";
import { getBase64 } from "../../until";

const AdminProductComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
    discount: "",
    selled: "",
  });

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = () => {
    console.log("object", stateProduct);
  };

  return (
    <div className="wrapper-adminProductComp">
      <div className="right-content-header">
        <h3>
          <AiOutlineSetting />
          Quản lý thông tin sản phẩm
        </h3>
        <button onClick={() => setIsModalOpen(true)}>
          <AiOutlinePlusCircle />
          Thêm mới sản phẩm
        </button>
      </div>
      <div className="right-content-table">
        <TableComponent />
      </div>
      <Modal title="Thêm mới sản phẩm" open={isModalOpen} onCancel={handleCancel} centered>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
            <Input name="name" value={stateProduct.name} onChange={handleOnchange} />
          </Form.Item>

          <Form.Item label="Type" name="type" rules={[{ required: true, message: "Please input your type!" }]}>
            <Input name="type" value={stateProduct.type} onChange={handleOnchange} />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input your price!" }]}>
            <Input name="price" value={stateProduct.price} onChange={handleOnchange} />
          </Form.Item>

          <Form.Item label="Discount" name="discount" rules={[{ message: "Please input your discount!" }]}>
            <Input name="discount" value={stateProduct.discount} placeholder="0" onChange={handleOnchange} />
          </Form.Item>

          <Form.Item label="Selled" name="selled" rules={[{ message: "Please input your selled!" }]}>
            <Input name="selled" value={stateProduct.selled} placeholder="0" onChange={handleOnchange} />
          </Form.Item>

          <Form.Item
            label="Count In Stock"
            name="countInStock"
            rules={[{ required: true, message: "Please input your count In Stock!" }]}
          >
            <Input name="countInStock" value={stateProduct.countInStock} onChange={handleOnchange} />
          </Form.Item>

          <Form.Item label="Rating" name="rating" rules={[{ required: true, message: "Please input your rating!" }]}>
            <Input name="rating" value={stateProduct.rating} onChange={handleOnchange} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input your description!" }]}
          >
            <Input
              name="description"
              value={stateProduct.description}
              placeholder="Thêm mô tả của sản phẩm..."
              onChange={handleOnchange}
            />
          </Form.Item>

          <Form.Item label="Image" name="image" rules={[{ message: "Please choose image!" }]}>
            <Upload onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<AiOutlineCloudUpload />}>Chọn file ảnh của bạn</Button>
            </Upload>
            {stateProduct?.image && (
              <div className="image-modal">
                <img src={stateProduct?.image} alt="avatar" />
              </div>
            )}
          </Form.Item>

          <Form.Item name="button-submit" wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProductComponent;

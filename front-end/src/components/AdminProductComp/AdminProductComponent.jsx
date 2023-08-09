import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineSetting, AiOutlineCloudUpload } from "react-icons/ai";
import { BsPen, BsTrash } from "react-icons/bs";
import TableComponent from "../TableComp/TableComponent";

import "./AdminProductComponent.scss";
import { Button, Form, Input, Modal, Upload } from "antd";
import { getBase64 } from "../../until";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import * as message from "../../components/MessageComp/MessageComponent";
import { useQuery } from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import DrawerComponent from "../DrawerComp/DrawerComponent";
import imagee from "../../assets/images/product/book.jpg";

const AdminProductComponent = () => {
  const [form] = Form.useForm();
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
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

  const mutation = useMutationHooks((data) => {
    const { name, image, type, price, countInStock, rating, description, discount, selled } = data;
    const res = ProductService.createProduct({
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      selled,
    });

    return res;
  });

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const { data, isSuccess, isError, isLoading } = mutation;
  const { data: products, isLoading: isLoadingProduct } = useQuery(["products"], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
  });

  const renderIconAction = () => {
    return (
      <div className="wrapper-iconAction">
        <Tippy content="Chi tiết">
          <div className="bsPen">
            <BsPen onClick={handleDetailProduct} />
          </div>
        </Tippy>

        <Tippy content="Xóa">
          <div className="mdDelete">
            <BsTrash />
          </div>
        </Tippy>
      </div>
    );
  };
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (name) => (
        <div className="name-product">
          <p>{name}</p>
        </div>
      ),
    },
    {
      title: "Giá ($)",
      dataIndex: "price",
    },
    {
      title: "Đã bán",
      dataIndex: "selled",
    },
    {
      title: "Số lượng",
      dataIndex: "countInStock",
    },
    {
      title: "Đánh giá (*)",
      dataIndex: "rating",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (img) => (
        <div className="data-image">
          <img src={img} alt="data-img" />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: renderIconAction,
    },
  ];

  const dataTable =
    products?.data?.length &&
    products?.data?.map((prod) => {
      return { ...prod, key: prod._id };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("Thêm sản phẩm thành công");
      handleCancel();
    } else if (isError && data?.status === "ERR") {
      message.error("Đã xảy ra lỗi, vui logf kiểm tra lại");
    }
  }, [isSuccess, isError]);

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
    setStateProduct({
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
    form.resetFields();
  };
  const onFinish = () => {
    mutation.mutate(stateProduct);
  };

  const handleDetailProduct = () => {
    setIsOpenDrawer(true);
    console.log("rowSelete", rowSelected);
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
        <TableComponent
          columns={columns}
          data={dataTable}
          isLoading={isLoadingProduct}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id); //Lấy cái id trong cái Row khi click
              },
            };
          }}
        />
      </div>
      <Modal title="Thêm mới sản phẩm" open={isModalOpen} onCancel={handleCancel} centered>
        <LoadingComponent isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
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
        </LoadingComponent>
      </Modal>

      {/* ---------------------------------------------------------------------------------- */}
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="70%"
      >
        <LoadingComponent isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}>
              <Input name="name" value={stateProduct.name} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Danh mục (loại)"
              name="type"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input name="type" value={stateProduct.type} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item label="Giá bán ($)" name="price" rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}>
              <Input name="price" value={stateProduct.price} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Giảm giá ($)"
              name="discount"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input name="discount" value={stateProduct.discount} placeholder="0" onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Số lượng đã bán"
              name="selled"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input name="selled" value={stateProduct.selled} placeholder="0" onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Số lượng hàng"
              name="countInStock"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input name="countInStock" value={stateProduct.countInStock} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Sao đánh giá (*)"
              name="rating"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input name="rating" value={stateProduct.rating} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Mô tả sản phẩm"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input
                name="description"
                value={stateProduct.description}
                placeholder="Thêm mô tả của sản phẩm..."
                onChange={handleOnchange}
              />
            </Form.Item>

            <Form.Item label="Hình ảnh" name="image">
              <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                <Button icon={<AiOutlineCloudUpload />}>Chọn file ảnh của bạn</Button>
              </Upload>
              {stateProduct?.image && (
                <div className="image-drawer">
                  <img src={imagee} alt="avatar" />
                  {/* <img src={stateProduct?.image} alt="avatar" /> */}
                </div>
              )}
            </Form.Item>

            <Form.Item name="button-submit" wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit">
                Cập nhập
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>
    </div>
  );
};

export default AdminProductComponent;

import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineSetting, AiOutlineCloudUpload } from "react-icons/ai";
import { BsPen, BsTrash, BsSearch } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import TableComponent from "../TableComp/TableComponent";

import "./AdminProductComponent.scss";
import { Button, Form, Input, Space, Upload } from "antd";
import { getBase64 } from "../../until";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import * as message from "../../components/MessageComp/MessageComponent";
import { useQuery } from "@tanstack/react-query";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import DrawerComponent from "../DrawerComp/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComp/ModalComponent";

const AdminProductComponent = () => {
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);

  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

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
  const [stateProductDetails, setStateProductDetails] = useState({
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

  const [form] = Form.useForm();

  // Mutation -----------------------------------------------------------------------------
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
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, rests);

    return res;
  });
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);

    return res;
  });

  // Handle API ---------------------------------------------------------------------------
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const fetchGetDetailProduct = async (rowSelected) => {
    const res = await ProductService.getDetailProduct(rowSelected);

    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        image: res?.data?.image,
        type: res?.data?.type,
        price: res?.data?.price,
        countInStock: res?.data?.countInStock,
        rating: res?.data?.rating,
        description: res?.data?.description,
        discount: res?.data?.discount,
        selled: res?.data?.selled,
      });
    }

    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [form, stateProductDetails]);

  useEffect(() => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailProduct(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailProduct = () => {
    setIsOpenDrawer(true);
  };

  const { data, isSuccess, isLoading } = mutation;
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated } = mutationUpdate;
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted } = mutationDeleted;

  const queryProduct = useQuery(["products"], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
  });
  const { data: products, isLoading: isLoadingProduct } = queryProduct;

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
            <BsTrash onClick={() => setIsModalOpenDelete(true)} />
          </div>
        </Tippy>
      </div>
    );
  };

  // --------------------------------------------------------------------------------------------------------------------
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<BsSearch />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <BsSearch style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text) => (
        <div className="name-product">
          <p>{text}</p>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length, // sắp xếp theo tên
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá ($)",
      dataIndex: "price",
      filters: [
        {
          text: "Dưới 50$",
          value: "<=",
        },
        {
          text: "Từ 50$ đến 500$",
          value: "=",
        },
        {
          text: "Trên 500$",
          value: ">=",
        },
      ],
      onFilter: (value, record) => {
        if (value === "<=") {
          return record.price <= 50;
        } else if (value === "=") {
          return record.price > 50 && record.price < 500;
        } else {
          return record.price >= 500;
        }
      },
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
      filters: [
        {
          text: "Dưới 1 sao",
          value: "<1",
        },
        {
          text: "Trong khoảng 1 sao",
          value: "<=2",
        },
        {
          text: "Trong khoảng 2 sao",
          value: "<=3",
        },
        {
          text: "Trong khoảng 3 sao",
          value: "<=4",
        },
        {
          text: "Trong khoảng 4 sao",
          value: "<=5",
        },
        {
          text: "5 sao",
          value: "=5",
        },
      ],
      onFilter: (value, record) => {
        if (value === "<1") {
          return record.rating < 1;
        } else if (value === "<=2") {
          return record.rating >= 1 && record.rating < 2;
        } else if (value === "<=3") {
          return record.rating >= 2 && record.rating < 3;
        } else if (value === "<=4") {
          return record.rating >= 3 && record.rating < 4;
        } else if (value === "<=5") {
          return record.rating >= 4 && record.rating < 5;
        } else {
          return record.rating >= 5;
        }
      },
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

  // -- useEffect() hiện thông báo khi handle ----------------------------------
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("Thêm sản phẩm thành công");
      handleCancel();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhập sản phẩm thành công");
      handleCloseDrawer();
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isLoadingDeleted && dataDeleted?.status === "OK") {
      // handleCancelDelete();
      message.success("Xóa sản phẩm thành công");
    }
  }, [isSuccessDeleted]);

  //----------------------------------------------------------------------------------------------
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
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
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };

  // Handle close (open) các modal, icons
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
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
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
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

  // Nhận và xử lý mutate() trong react-query ------------------------------------------------------
  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch(); // Tự động load data khi thêm mới 1 sản phẩm
      },
    });
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateProductDetails,
      },
      {
        onSettled: () => {
          queryProduct.refetch(); // Tự động load data khi Update mới 1 sản phẩm
        },
      }
    );
  };
  const onDeleteProduct = () => {
    mutationDeleted.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          queryProduct.refetch(); // Tự động load data khi Delete 1 sản phẩm
        },
      }
    );
    handleCancelDelete();
    message.success("Xóa sản phẩm thành công");
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
          onRow={(record) => {
            return {
              onClick: () => {
                setRowSelected(record._id); //Lấy cái id trong cái Row khi click
              },
            };
          }}
        />
      </div>
      <ModalComponent
        title="Thêm mới sản phẩm"
        forceRender
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }} // Ẩn button OK trong ant design
        centered
      >
        <LoadingComponent isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input name="name" value={stateProduct.name} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Danh mục (thể loại)"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <Input name="type" value={stateProduct.type} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item label="Giá bán" name="price" rules={[{ required: true, message: "Please input your price!" }]}>
              <Input name="price" value={stateProduct.price} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Giảm giá"
              name="discount"
              rules={[{ required: true, message: "Please input your discount!" }]}
            >
              <Input name="discount" value={stateProduct.discount} placeholder="0" onChange={handleOnchange} />
            </Form.Item>

            <Form.Item label="Đã bán" name="selled" rules={[{ required: true, message: "Please input your selled!" }]}>
              <Input name="selled" value={stateProduct.selled} placeholder="0" onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Số lượng còn"
              name="countInStock"
              rules={[{ required: true, message: "Please input your count In Stock!" }]}
            >
              <Input name="countInStock" value={stateProduct.countInStock} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Đánh giá (*)"
              name="rating"
              rules={[{ required: true, message: "Please input your rating!" }]}
            >
              <Input name="rating" value={stateProduct.rating} onChange={handleOnchange} />
            </Form.Item>

            <Form.Item
              label="Mô tả sản phẩm"
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

            <Form.Item label="Hình ảnh sản phẩm" name="image" rules={[{ message: "Please choose image!" }]}>
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
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Tạo sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </ModalComponent>

      {/* ---------------------------------------------------------------------------------- */}
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="70%"
      >
        <LoadingComponent isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}>
              <Input name="name" value={stateProductDetails.name} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Danh mục (loại)"
              name="type"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input name="type" value={stateProductDetails.type} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item label="Giá bán ($)" name="price" rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}>
              <Input name="price" value={stateProductDetails.price} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Giảm giá ($)"
              name="discount"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input
                name="discount"
                value={stateProductDetails.discount}
                placeholder="0"
                onChange={handleOnchangeDetails}
              />
            </Form.Item>

            <Form.Item
              label="Số lượng đã bán"
              name="selled"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input
                name="selled"
                value={stateProductDetails.selled}
                placeholder="0"
                onChange={handleOnchangeDetails}
              />
            </Form.Item>

            <Form.Item
              label="Số lượng hàng"
              name="countInStock"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input name="countInStock" value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Sao đánh giá (*)"
              name="rating"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input name="rating" value={stateProductDetails.rating} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Mô tả sản phẩm"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập dữ liệu!" }]}
            >
              <Input
                name="description"
                value={stateProductDetails.description}
                placeholder="Thêm mô tả của sản phẩm..."
                onChange={handleOnchangeDetails}
              />
            </Form.Item>

            <Form.Item label="Hình ảnh" name="image">
              <Upload onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button icon={<AiOutlineCloudUpload />}>Chọn file ảnh của bạn</Button>
              </Upload>
              {stateProductDetails?.image && (
                <div className="image-drawer">
                  <img src={stateProductDetails?.image} alt="avatar" />
                </div>
              )}
            </Form.Item>

            <Form.Item name="button-submit" wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" style={{ fontWeight: 600 }}>
                CẬP NHẬP SẢN PHẨM
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>

      {/* --------------------------------------------------------------------------------- */}
      <ModalComponent title="Xóa Dữ Liệu" open={isModalOpenDelete} onOk={onDeleteProduct} onCancel={handleCancelDelete}>
        <LoadingComponent isLoading={isLoadingDeleted}>
          <div style={{ display: "grid", justifyItems: "center", paddingBottom: "20px" }}>
            <span style={{ fontSize: "1.8rem" }}>Bạn có chắc xóa sản phẩm này không?</span>
            <CiWarning style={{ fontSize: "100px", color: "yellow" }} />
          </div>
        </LoadingComponent>
      </ModalComponent>
    </div>
  );
};

export default AdminProductComponent;

import React from "react";
import { Table } from "antd";

import image from "../../assets/images/product/OngVang.jpg";

import "./TableComponent.scss";

const TableComponent = (props) => {
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
      render: () => (
        <div className="data-image">
          <img src={image} alt="data-img" />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
    },
  ];
  const data = [
    {
      key: "1",
      name: "abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv",
      price: "abc",
      selled: "abc",
      countInStock: "abc",
      rating: "abc",
      action: "abc",
    },
    {
      key: "2",
      name: "abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv",
      price: "abc",
      selled: "abc",
      countInStock: "abc",
      rating: "abc",
      action: "abc",
    },
    {
      key: "3",
      name: "abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv abcde vdvdvv v abcde vdvdvv",
      price: "abc",
      selled: "abc",
      countInStock: "abc",
      rating: "abc",
      action: "abc",
    },
  ];

  const { selectionType = "checkbox" } = props;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <Table
        className="wrapper-table"
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default TableComponent;

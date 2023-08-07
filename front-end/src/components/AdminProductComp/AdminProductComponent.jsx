import React from "react";
import { AiOutlineUsergroupAdd, AiOutlineSetting } from "react-icons/ai";
import TableComponent from "../TableComp/TableComponent";

import "./AdminProductComponent.scss";

const AdminProductComponent = () => {
  return (
    <div className="wrapper-adminProductComp">
      <div className="right-content-header">
        <h3>
          <AiOutlineSetting />
          Quản lý thông tin sản phẩm
        </h3>
        <button>
          <AiOutlineUsergroupAdd />
          Thêm mới sản phẩm
        </button>
      </div>
      <div className="right-content-table">
        <TableComponent />
      </div>
    </div>
  );
};

export default AdminProductComponent;

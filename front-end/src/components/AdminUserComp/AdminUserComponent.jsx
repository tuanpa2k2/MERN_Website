import React from "react";
import { AiOutlineUsergroupAdd, AiOutlineSetting } from "react-icons/ai";
import TableComponent from "../TableComp/TableComponent";

import "./AdminUserComponent.scss";

const AdminUserComponent = () => {
  return (
    <div className="wapper-adminUserComp">
      <div className="right-content-header">
        <h3>
          <AiOutlineSetting />
          Quản lý thông tin người dùng
        </h3>
        <button>
          <AiOutlineUsergroupAdd />
          Thêm mới người dùng
        </button>
      </div>
      <div className="right-content-table">
        <TableComponent />
      </div>
    </div>
  );
};

export default AdminUserComponent;

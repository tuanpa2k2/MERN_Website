import React, { useState } from "react";
import { Table } from "antd";
import { BsTrash } from "react-icons/bs";
import LoadingComponent from "../LoadingComp/LoadingComponent";

import "./TableComponent.scss";

const TableComponent = (props) => {
  const { selectionType = "checkbox", data = [], isLoading = false, columns = [], handleDeleteMany } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };

  const handleDeleteManyAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
        <div className="btn-deleteAll" onClick={handleDeleteManyAll}>
          <BsTrash />
          Xóa tất cả
        </div>
      )}
      <Table
        className="wrapper-table"
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </LoadingComponent>
  );
};

export default TableComponent;

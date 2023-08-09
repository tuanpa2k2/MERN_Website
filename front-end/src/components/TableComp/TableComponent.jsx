import React from "react";
import { Table } from "antd";
import LoadingComponent from "../LoadingComp/LoadingComponent";

import "./TableComponent.scss";

const TableComponent = (props) => {
  const { selectionType = "checkbox", data = [], isLoading = false, columns = [] } = props;

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
    <LoadingComponent isLoading={isLoading}>
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

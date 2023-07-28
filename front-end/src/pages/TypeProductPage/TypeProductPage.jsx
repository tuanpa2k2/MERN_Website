import React from "react";
import NavbarLeftComponent from "../../components/NavbarLeftComp/NavbarLeftComponent";
import CardComponent from "../../components/CardComp/CardComponent";
import { Pagination } from "antd";

import "./TypeProductPage.scss";

const TypeProductPage = () => {
  return (
    <div className="wrapper-containerTypeProPage">
      <div className="column-left">
        <NavbarLeftComponent />
      </div>
      <div className="column-right">
        <div className="card-Comp">
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
        <div className="pagination">
          <Pagination total={500} />
        </div>
      </div>
    </div>
  );
};

export default TypeProductPage;

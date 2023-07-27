import React from "react";
import NavbarLeftComponent from "../../components/NavbarLeftComp/NavbarLeftComponent";
import CardComponent from "../../components/CardComp/CardComponent";

import "./TypeProductPage.scss";

const TypeProductPage = () => {
  return (
    <div className="wrapper-containerTypeProPage">
      <div className="column-left">
        <NavbarLeftComponent />
      </div>
      <div className="column-right">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
};

export default TypeProductPage;

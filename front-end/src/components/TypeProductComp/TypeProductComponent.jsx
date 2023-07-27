import React from "react";
import "./TypeProductComponent.scss";

const TypeProductComponent = ({ name }) => {
  // lấy childen 'name' trong 'HomePage'
  return <div className="wrapper-typeProduct">{name}</div>;
};

export default TypeProductComponent;

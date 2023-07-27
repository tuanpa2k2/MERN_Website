import React from "react";
import TypeProductComponent from "../../components/TypeProductComp/TypeProductComponent";

import "./HomePage.scss";

const HomePage = () => {
  const arrTypeProduct = [
    "Tivi",
    "Tủ lạnh",
    "máy giặt",
    "điều hòa",
    "laptop",
    "điện thoại",
    "áo phông",
    "giày",
    "quần jean",
    "kính thời trang",
  ];

  return (
    <div className="wrapper-containerHomePage">
      <div className="wrapper-typeProductComp">
        {arrTypeProduct.map((item) => {
          return <TypeProductComponent key={item} name={item} />;
        })}
      </div>
      <div className="wrapper-homePage">Home Page</div>
    </div>
  );
};

export default HomePage;

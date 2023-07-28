import React from "react";

import "./ProductDetailPage.scss";
import ProductDetailComponent from "../../components/ProductDetailComp/ProductDetailComponent";

const ProductDetailPage = () => {
  return (
    <div className="wrapper-proDetailPage">
      <div className="breadcrumb">
        <ul>
          <li>
            <p>Home</p>
          </li>
          <li>
            <p>type product</p>
          </li>
          <li>
            <p>product detail</p>
          </li>
          <li>
            <p>name product</p>
          </li>
        </ul>
      </div>
      <div className="wrapper-productDetailComp">
        <ProductDetailComponent />
      </div>
    </div>
  );
};

export default ProductDetailPage;

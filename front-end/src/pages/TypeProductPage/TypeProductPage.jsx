import React, { useEffect, useState } from "react";
import NavbarLeftComponent from "../../components/NavbarLeftComp/NavbarLeftComponent";
import CardComponent from "../../components/CardComp/CardComponent";
import { Pagination } from "antd";
import * as ProductService from "../../services/ProductService";

import "./TypeProductPage.scss";
import { useLocation } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";

const TypeProductPage = () => {
  const { state } = useLocation(); // lấy state từ Location
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductType = async (type) => {
    const res = await ProductService.getProductType(type);
    if (res?.status === "OK") {
      setIsLoading(false);
      setProducts(res?.data);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="wrapper-containerTypeProPage">
        <div className="column-left">
          <NavbarLeftComponent />
        </div>

        <div className="column-right">
          <div className="card-Comp">
            {products?.map((prod) => {
              return (
                <CardComponent
                  key={prod.name}
                  countInStock={prod.countInStock}
                  description={prod.description}
                  image={prod.image}
                  name={prod.name}
                  price={prod.price}
                  rating={prod.rating}
                  type={prod.type}
                  discount={prod.discount}
                  selled={prod.selled}
                  id={prod._id}
                />
              );
            })}
          </div>
          <div className="pagination">
            <Pagination total={500} />
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default TypeProductPage;

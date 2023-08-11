import React, { Fragment } from "react";
import TypeProductComponent from "../../components/TypeProductComp/TypeProductComponent";
import SliderComponent from "../../components/SliderComp/SliderComponent";
import CardComponent from "../../components/CardComp/CardComponent";
import { useQuery } from "@tanstack/react-query";
import { BsCartX } from "react-icons/bs";
import * as ProductService from "../../services/ProductService";

import slider1 from "../../assets/images/slider/slider1.jpg";
import slider2 from "../../assets/images/slider/slider2.jpg";
import slider3 from "../../assets/images/slider/slider3.jpg";
import slider4 from "../../assets/images/slider/slider4.jpg";
import slider5 from "../../assets/images/slider/slider5.jpg";
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

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const { data: products } = useQuery(["products"], fetchProductAll, { retry: 3, retryDelay: 1000 });

  return (
    <div className="wrapper-containerHomePage">
      <div className="wrapper-typeProductComp">
        {arrTypeProduct.map((item) => {
          return <TypeProductComponent key={item} name={item} />;
        })}
      </div>
      <div className="wrapper-sliderPage">
        <SliderComponent arrImages={[slider1, slider2, slider3, slider4, slider5]} />
      </div>
      <div className="wrapper-homePage">
        <div className="wrapper-cardPage">
          {products?.data?.length ? (
            products?.data?.map((prod) => {
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
                />
              );
            })
          ) : (
            <div className="card-empty">
              <span>Chưa có sản phẩm nào ở đây</span>
              <BsCartX />
            </div>
          )}
        </div>
        {products?.data?.length >= 5 ? (
          <div className="btn-more">
            <button>Xem thêm</button>
          </div>
        ) : (
          Fragment
        )}
      </div>
    </div>
  );
};

export default HomePage;

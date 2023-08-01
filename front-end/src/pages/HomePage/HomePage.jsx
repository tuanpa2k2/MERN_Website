import React, { useEffect } from "react";
import AOS from "aos";
import TypeProductComponent from "../../components/TypeProductComp/TypeProductComponent";
import SliderComponent from "../../components/SliderComp/SliderComponent";
import CardComponent from "../../components/CardComp/CardComponent";

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

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="wrapper-containerHomePage">
      <div className="wrapper-typeProductComp">
        {arrTypeProduct.map((item) => {
          return <TypeProductComponent key={item} name={item} />;
        })}
      </div>
      <div className="wrapper-sliderPage">
        <SliderComponent
          arrImages={[slider1, slider2, slider3, slider4, slider5]}
        />
      </div>
      <div className="wrapper-homePage">
        <div className="wrapper-cardPage">
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
        <div
          className="btn-more"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="2000"
        >
          <button>Xem thêm</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

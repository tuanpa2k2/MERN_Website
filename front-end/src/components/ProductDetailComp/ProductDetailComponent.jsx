import React, { useState } from "react";

import { AiOutlineShoppingCart, AiOutlineMinusCircle } from "react-icons/ai";
import { CiMoneyCheck1, CiLocationOn } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoPlusCircle } from "react-icons/go";
import * as ProductService from "../../services/ProductService";

import { useQuery } from "@tanstack/react-query";

import "./ProductDetailComponent.scss";
import LoadingComponent from "../LoadingComp/LoadingComponent";
import { Rate } from "antd";
import { useSelector } from "react-redux";

const ProductDetailComponent = ({ idProduct }) => {
  const user = useSelector((state) => state?.user);

  const [numQuantity, setNumQuantity] = useState(1);
  const onchangeInput = (value) => {
    setNumQuantity(Number(value));
  };

  const fetchGetDetailProduct = async (context) => {
    const idPro = context?.queryKey && context?.queryKey[1];

    const res = await ProductService.getDetailProduct(idPro);
    return res.data;
  };

  const { data: productsDetails, isLoading } = useQuery(["products-detils", idProduct], fetchGetDetailProduct, {
    enabled: !!idProduct,
  });

  const handleChangeCount = (type) => {
    if (type === "incraese") {
      setNumQuantity(numQuantity + 1);
    } else {
      setNumQuantity(numQuantity - 1);
    }
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="wrapper-productComp">
        <div className="col-left">
          <div className="img-big">
            <img src={productsDetails?.image} alt="prod" />
          </div>
          <div className="img-small">
            <div className="img-children">
              <img src={productsDetails?.image} alt="prod" />
            </div>
            <div className="img-children">
              <img src={productsDetails?.image} alt="prod" />
            </div>
            <div className="img-children">
              <img src={productsDetails?.image} alt="prod" />
            </div>
            <div className="img-children">
              <img src={productsDetails?.image} alt="prod" />
            </div>
          </div>
        </div>
        <div className="col-right">
          <div className="title-name">{productsDetails?.name}</div>

          <div className="content-details">
            <div className="name-label">Giá bán:</div>
            <div className="detail-label">
              <span className="price">{productsDetails?.price?.toLocaleString()} vnđ</span>
              <span className="price-discount">{productsDetails?.discount}%</span>
            </div>
          </div>

          <div className="content-details">
            <div className="name-label">Số lượng</div>
            <div className="detail-label">
              <div className="action-quantity">
                <button className="minus" onClick={() => handleChangeCount("decraese")}>
                  <AiOutlineMinusCircle />
                </button>
                <input
                  className="input-text"
                  type="text"
                  defaultValue={1}
                  value={numQuantity}
                  onChange={onchangeInput}
                />
                <button className="plus" onClick={() => handleChangeCount("incraese")}>
                  <GoPlusCircle />
                </button>
              </div>
              <span className="space">|</span>
              <span className="countInStock"> Kho hàng: {productsDetails?.countInStock}</span>
            </div>
          </div>

          <div className="content-details">
            <div className="name-label">Thể loại:</div>
            <div className="detail-label">
              <span className="type">{productsDetails?.type}</span>
            </div>
          </div>

          <div className="content-details">
            <div className="name-label">Đánh giá:</div>
            <div className="detailRating-label">
              <Rate disabled defaultValue={productsDetails?.rating} value={productsDetails?.rating} />
              <div className="space-rating">|</div>
              <span className="selled">Đã bán: {productsDetails?.selled}</span>
            </div>
          </div>

          <div className="content2-details">
            <div className="name-label">Mô tả:</div>
            <div className="detail-label">
              <p>{productsDetails?.description}</p>
            </div>
          </div>

          <div className="content2-details">
            <div className="name-label">Vận chuyển:</div>
            <div className="detail-label">
              <div className="content-location">
                <div className="send-location">
                  <div className="icons">
                    <CiLocationOn />
                    kho hàng ở:
                  </div>
                  <span>Thuần Thành, huyện Thái Thụy - Thái Bình.</span>
                </div>
                <div className="receive-location">
                  <div className="icons">
                    <LiaShippingFastSolid />
                    địa chỉ của bạn:
                  </div>
                  <span>{user?.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="btn-action">
            <button className="add-to-card">
              <AiOutlineShoppingCart />
              Thêm vào giỏ hàng
            </button>
            <button className="buy-now">
              <CiMoneyCheck1 />
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default ProductDetailComponent;

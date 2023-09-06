import React, { useState } from "react";

import { AiOutlineShoppingCart, AiOutlineMinusCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoPlusCircle } from "react-icons/go";
import * as ProductService from "../../services/ProductService";
import * as message from "../MessageComp/MessageComponent";

import { useQuery } from "@tanstack/react-query";

import "./ProductDetailComponent.scss";
import LoadingComponent from "../LoadingComp/LoadingComponent";
import { Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../until";

const ProductDetailComponent = ({ idProduct }) => {
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      message.warning("Vui lòng phải đăng nhập để mua hàng!");
      navigate("/sign-in", { state: location?.pathname });
    } else {
      message.success("Thêm vào giỏ hàng thành công!");
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productsDetails?.name,
            amount: numQuantity,
            image: productsDetails?.image,
            price: productsDetails?.price,
            discount: productsDetails?.discount,
            countInStock: productsDetails?.countInStock,
            product: productsDetails?._id,
          },
        })
      );
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
              <span className="price">{convertPrice(productsDetails?.price)}</span>
              <span className="space">---</span>
              <span className="price-discount">Giam gia: {productsDetails?.discount}%</span>
            </div>
          </div>

          <div className="content-details">
            <div className="name-label">Số lượng:</div>
            <div className="detail-label-quantity">
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
                  min={1}
                />
                <button className="plus" onClick={() => handleChangeCount("incraese")}>
                  <GoPlusCircle />
                </button>
              </div>
              <span className="space">---</span>
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
              <span>4</span>
              <Rate disabled defaultValue={productsDetails?.rating} value={productsDetails?.rating} />
              <div className="space">---</div>
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
            <button className="add-to-card" onClick={handleAddOrderProduct}>
              <AiOutlineShoppingCart />
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default ProductDetailComponent;

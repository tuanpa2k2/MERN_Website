const Order = require("../models/OrderProduct");
const bcrypt = require("bcrypt");
const Product = require("../models/ProductModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, user, fullName, address, city, phone } =
      newOrder;

    try {
      const promises = orderItems?.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order?.product, // tìm kiếm và lấy cái 'id product' bằng với cái 'id product' trong orderItems
            countInStock: { $gte: order?.amount }, // tìm 'id product' trên để check số lượng còn bao nhiêu để cho phép giảm khi mua
          },
          {
            $inc: {
              countInStock: -order?.amount,
              selled: +order?.amount,
            },
          },
          {
            new: true, // Trả về số lượng mới nhất
          }
        );

        if (productData) {
          // nếu id product đó có đủ số lượng đặt hàng thì
          const createdOrder = await Order.create({
            orderItems,
            shippingAddress: {
              fullName,
              address,
              city,
              phone,
            },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user,
          });

          if (createdOrder) {
            return {
              status: "OK",
              message: "Success Order",
            };
          }
        } else {
          // nếu ko đủ số lượng đặt hàng thì
          return {
            status: "OK",
            message: "ERR",
            id: order?.product,
          };
        }
      });

      const results = await Promise.all(promises);
      const newData = results && results.filter((item) => item.id);

      if (newData.length) {
        resolve({
          status: "ERR",
          message: `Sản phẩm với id: ${newData.join(",")} không đủ hàng để mua`,
        });
      } else {
        resolve({
          status: "OK",
          message: "Mua sản phẩm thành công .............",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id, //tìm id product đã tồn tại trong db chưa?
      });

      if (order === null) {
        resolve({
          status: "ERR",
          message: "Sản phẩm này không tồn tại!",
        });
      }

      resolve({
        status: "OK",
        message: "Get detail Oroduct Success",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id, //tìm id order đã tồn tại trong db chưa?
      });

      if (order === null) {
        resolve({
          status: "ERR",
          message: "Sản phẩm này không tồn tại!",
        });
      }

      resolve({
        status: "OK",
        message: "Get detail Order Success kk...",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const cancelOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findByIdAndDelete(id);

      if (order === null) {
        resolve({
          status: "ERR",
          message: "Sản phẩm này không tồn tại!",
        });
      }

      resolve({
        status: "OK",
        message: "Hủy đơn hàng thành công...",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails
};

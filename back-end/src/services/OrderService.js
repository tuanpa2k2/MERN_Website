const Order = require("../models/OrderProduct");
const bcrypt = require("bcrypt");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    console.log("new-Order", newOrder);

    const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, user, fullName, address, city, phone } =
      newOrder;

    try {
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
        resolve({
          status: "OK",
          message: "Success Order",
          data: createdOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
};

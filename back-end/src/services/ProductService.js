const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } = newProduct;

    try {
      const checkProduct = await Product.findOne({
        name: name, //tìm name đã tồn tại trong db chưa?
      });

      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "Tên sản phẩm đã tồn tại",
        });
      }

      const createdProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });

      if (createdProduct) {
        resolve({
          status: "OK",
          message: "Success",
          data: createdProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProductId = await Product.findOne({
        _id: id, //tìm id đã tồn tại trong db chưa?
      });

      if (checkProductId === null) {
        resolve({
          status: "ERR",
          message: "Sản phẩm này không tồn tại!",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "Update Product success",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id, //tìm id product đã tồn tại trong db chưa?
      });

      if (product === null) {
        resolve({
          status: "ERR",
          message: "Sản phẩm này không tồn tại!",
        });
      }

      resolve({
        status: "OK",
        message: "Get detail Product success",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit = 5, page = 0) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allProduct = await Product.find()
        .limit(limit) // .limit(4) : lấy ra 4 sản phẩm đầu tiên của 1 trang
        .skip(page * limit); // .skip(3) : nó sẽ bỏ qua 3 sản phẩm đầu tiên và lấy tiếp sản phẩm tiếp đó của page khác
      const totalProduct = await Product.count();

      resolve({
        status: "OK",
        message: "All product success",
        data: allProduct,
        pageCurrent: Number(page + 1),
        totalProduct,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProductId = await Product.findOne({
        _id: id, //tìm email đã tồn tại trong db chưa?
      });

      if (checkProductId === null) {
        resolve({
          status: "ERR",
          message: "Sản phẩm này không tồn tại!",
        });
      }

      await Product.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  getAllProduct,
  deleteProduct,
};

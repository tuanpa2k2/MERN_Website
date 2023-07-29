const User = require("../models/UserModel");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;

    try {
      const checkUser = await User.findOne({
        email: email, //tìm email đã tông tại trong db chưa?
      });

      if (checkUser !== null) {
        resolve({
          status: "OK",
          message: "Email đã tồn tại",
        });
      }

      const createdUser = await User.create({
        name,
        email,
        password,
        confirmPassword,
        phone,
      });

      if (createdUser) {
        resolve({
          status: "OK",
          message: "Success",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
};

const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./jwtService");

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

      // Tạo mã hóa cho mật khẩu
      const hash = bcrypt.hashSync(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hash,
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

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = userLogin;

    try {
      const checkUser = await User.findOne({
        email: email, //tìm email đã tông tại trong db chưa?
      });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Email không tồn tại",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "OK",
          message: "Mật khẩu không đúng!",
        });
      }

      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "Success",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
};

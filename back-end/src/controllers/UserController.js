const UserService = require("../services/UserService");
const jwtService = require("../services/jwtService");

const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = regex.test(email);

    if (!email) {
      return res.status(200).json({
        status: "Err-Empty-email",
        message: "Không được để trống dữ liệu!",
      });
    } else if (!password) {
      return res.status(200).json({
        status: "Err-Empty-password",
        message: "Không được để trống dữ liệu!",
      });
    } else if (!confirmPassword) {
      return res.status(200).json({
        status: "Err-Empty-confirmPassword",
        message: "Không được để trống dữ liệu!",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "Err-Email",
        message: "Không đúng định dạng gmail!",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "Err-Equal-password",
        message: "Mật khẩu không khớp!",
      });
    }

    const response = await UserService.createUser(req.body);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = regex.test(email);

    if (!email) {
      return res.status(200).json({
        status: "Err-Empty-email",
        message: "Không được để trống dữ liệu!",
      });
    } else if (!password) {
      return res.status(200).json({
        status: "Err-Empty-password",
        message: "Không được để trống dữ liệu!",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "Err-Email",
        message: "Không đúng định dạng gmail!",
      });
    }

    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false, // bảo mật phía client
      samsite: "strict",
    });

    return res.status(200).json(newResponse);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required...",
      });
    }

    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required...",
      });
    }

    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required...",
      });
    }

    const response = await UserService.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required...",
      });
    }

    const response = await jwtService.refreshTokenService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
};

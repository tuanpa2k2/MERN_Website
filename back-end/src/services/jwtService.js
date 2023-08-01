const jwt = require("jsonwebtoken");

const genneralAccessToken = (payload) => {
  const accessToken = jwt.sign(
    {
      payload,
    },
    "access_token",
    { expiresIn: "1h" }
  );

  return accessToken;
};

const genneralRefreshToken = (payload) => {
  const refreshToken = jwt.sign(
    {
      payload,
    },
    "refresh_token",
    { expiresIn: "365d" }
  );

  return refreshToken;
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
};

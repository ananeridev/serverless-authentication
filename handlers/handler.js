// handler.js
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const SECRET_KEY = "secret_key";
const login = async (event) => {
  const { email, password } = JSON.parse(event.body);
  const user = await User.findOne({ email, password }); // only for test purpose
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid credentials" }),
    };
  }
  const token = jwt.sign({ id: user._id }, SECRET_KEY);
  return { statusCode: 200, body: JSON.stringify({ token }) };
};

const authenticate = (handler) => async (event) => {
  const { authorization } = event.headers;
  if (!authorization) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "No token provided" }),
    };
  }
  try {
    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid token" }),
      };
    }
    return handler(event);
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid token" }),
    };
  }
};

module.exports = { login, authenticate };

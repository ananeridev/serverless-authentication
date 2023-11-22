const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true });

const create = async (event) => {
  const data = JSON.parse(event.body);
  const user = new User(data);
  await user.save();
  return { statusCode: 200, body: JSON.stringify(user) };
};

const read = async (event) => {
  const { id } = event.pathParameters;
  const user = await User.findById(id);
  return { statusCode: 200, body: JSON.stringify(user) };
};

const update = async (event) => {
  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  return { statusCode: 200, body: JSON.stringify(user) };
};

const remove = async (event) => {
  const { id } = event.pathParameters;
  await User.findByIdAndDelete(id);
  return { statusCode: 200, body: JSON.stringify({ message: "User deleted" }) };
};

module.exports = { create, read, update, remove };

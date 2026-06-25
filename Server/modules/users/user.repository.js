const User = require("./user.model");

const create = (data) => User.create(data);

const findById = (id) => User.findById(id).select("-password");

const findByEmail = (email) => User.findOne({ email });

const findByUsername = (username) => User.findOne({ username });

const searchUsers = (username) => {
  return User.find({
    username: { $regex: username, $options: "i" },
  }).select("_id username email avatar isOnline");
};

const updateById = (id, data) => {
  return User.findByIdAndUpdate(id, { $set: data }, { new: true }).select("-password");
};

module.exports = { create, findById, findByEmail, findByUsername, searchUsers, updateById };
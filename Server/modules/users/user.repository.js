const User = require("./user.model");

const create = (data) => User.create(data);
const findById = (id) => User.findById(id).select("-password");
const findByEmail = (email) => User.findOne({ email });
const findByUsername = (username) => User.findOne({ username });

const searchUsers = (query, excludeId) =>
  User.find({
    $or: [
      { username: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ],
    _id: { $ne: excludeId },
  })
    .select("_id username email avatar isOnline lastSeen")
    .limit(20);

const updateById = (id, data) =>
  User.findByIdAndUpdate(id, { $set: data }, { new: true }).select("-password");

module.exports = {
  create,
  findById,
  findByEmail,
  findByUsername,
  searchUsers,
  updateById,
};

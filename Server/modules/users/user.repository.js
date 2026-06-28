const User = require("./user.model");

const findById = (id) => User.findById(id).select("-password");

const findByEmail = (email) => User.findOne({ email });

const findByUsername = (username) => User.findOne({ username });

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const searchUsers = (query, excludeId) => {
  const safe = escapeRegex(query.trim());
  const regex = new RegExp(safe, "i");
  return User.find({
    $or: [{ username: regex }, { email: regex }],
    _id: { $ne: excludeId },
  })
    .select("_id username email avatar isOnline lastSeen")
    .limit(20);
};

const updateById = (id, data) =>
  User.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).select("-password");

module.exports = {
  findById,
  findByEmail,
  findByUsername,
  searchUsers,
  updateById,
};
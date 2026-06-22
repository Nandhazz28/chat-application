const User = require("./user.model");

const create = (data) => {
  return User.create(data);
};

const findById = (id) => {
  return User.findById(id);
};

const findByEmail = (email) => {
  return User.findOne({ email });
};

const findByUsername = (username) => {
  return User.findOne({ username });
};

const updateById = (id, data) => {
  return User.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};

module.exports = {
  create,
  findById,
  findByEmail,
  findByUsername,
  updateById,
};
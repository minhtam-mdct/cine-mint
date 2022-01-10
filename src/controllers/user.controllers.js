const { configEnv } = require("../config");
const { User } = require("../models");
const bcryptjs = require("bcryptjs");

const findAllUser = async (req, res) => {
  try {
    const userList = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const detailUser = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id,
      },
    });
    res.status(200).send(detailUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, pasword, numberPhone, type } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(pasword, salt);

    const newUser = await User.create({
      name,
      email,
      pasword: hashPassword,
      numberPhone,
      type,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pasword, numberPhone, type } = req.body;
    await User.update({ name, pasword, numberPhone, type }, { where: { id } });
    const detailUser = await User.findByPk(id);
    res.status(200).status(detailUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const detailUser = await User.findByPk(id);
    await User.destroy({ where: { id } });
    res.status(200).send(detailUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadAvatar = async (req, res) => {
  const { user, file } = req;
  const urlImage = configEnv.server.host + file.path;
  const userUploadAvatar = await User.findByPk(user.id);
  userUploadAvatar.avatar = urlImage;
  await userUploadAvatar.save();
  res.status(200).send(userUploadAvatar);
};

module.exports = {
  findAllUser,
  findDetailUser,
  createUser,
  updateUser,
  removeUser,
  uploadAvatar,
};

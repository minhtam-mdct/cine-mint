const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { generateEmail } = require("../services/email");
const nodemailer = require("nodemailer");

const signUp = async (req, res) => {
  const { name, email, password, numberPhone, type } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
      type,
    });
    let info = await generateEmail(`<b>Hello ${user.name}!</b>`);
    res.status(200).send({
      user,
      sendEmail: nodemailer.getTestMessageUrl(info),
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  /**
   * 2 bước đăng nhập :
   *  1/ tìm user theo email
   *  2/ so sánh password
   */
  const { email, password } = req.body;
  try {
    const userLogin = await User.findOne({
      where: {
        email,
      },
    });
    if (userLogin) {
      //  so sánh password
      const isAuth = bcryptjs.compareSync(password, userLogin.password);
      if (isAuth) {
        /**
         * tạo jsonwebtoken
         */
        const payload = {
          id: userLogin.id,
          email: userLogin.email,
          type: userLogin.type,
        };
        const secretKey = "MinT";
        const token = jwt.sign(payload, secretKey, { expiresIn: 30 });

        res.status(200).send({
          messages: "Đăng nhập thành công",
          token: token,
        });
      } else {
        res.status(400).send({
          messages: "Password không chính xác",
        });
      }
    } else {
      res.status(404).send({
        messages: "Email không chính xác",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  signUp,
  signIn,
};

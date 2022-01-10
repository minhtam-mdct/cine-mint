const nodemailer = require("nodemailer");

const generateEmail = async (html) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "youremail@gmail.com",
      pass: "yourpassword",
    },
  });
  let info = await transporter.sendMail({
    from: '"MinT" <minhtam.mdct@gmail.com',
    to: "minhtam.mdct@gmail.com",
    subject: "Hello",
    text: "Hello",
    html,
  });
  return info;
};

module.exports = {
  generateEmail,
};

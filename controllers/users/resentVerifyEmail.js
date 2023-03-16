const { User } = require("../../models/user");
const createError = require("http-errors");
const { sendEmail } = require("../../middlewares");

const resentVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, "User not found");
  }
  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
  }
  const mail = {
    to: email,
    subject: "Verification successful",
    html: `<a href="http://localhost:3000/api/users/verify/:${user.verificationToken}">Confirm the email</a>`,
  };
  await sendEmail(mail);

  res.json({ message: "Verification email sent" });
};

module.exports = resentVerifyEmail;

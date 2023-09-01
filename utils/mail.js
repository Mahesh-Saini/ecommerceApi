import nodemailer from "nodemailer";

export const sendMail = async (user, res, message) => {
  const MAIL_SERVICE = process.env.MAIL_SERVICE;
  const MAIL_PORT = process.env.MAIL_PORT;
  const MAIL_USER = process.env.MAIL_USER;
  const MAIL_PASS = process.env.MAIL_PASS;
  try {
    const transporter = nodemailer.createTransport({
      service: MAIL_SERVICE,
      port: MAIL_PORT,
      secure: true,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: MAIL_USER,
      to: user.email,
      subject: "Ecommerce password recovery",
      text: message,
    });

    if (!info.messageId) {
      return next(
        new ErrorHandler("Something went wrong mail did't  sended.", 500)
      );
    }
    return res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully!`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return next(new ErrorHandler(`Something went wrong ${err.message}`, 500));
  }
};

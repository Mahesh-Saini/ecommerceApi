import nodemailer from "nodemailer";

export const sendMail = async (user, res, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.mail_service,
      port: process.env.mail_port,
      secure: true,
      auth: {
        user: process.env.mail_user,
        pass: process.env.mail_pass,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.mail_user,
      to: user.email,
      subject: "Ecommerce password recovery",
      text: message,
    });

    if (!info.messageId) {
      return next(new ErrorHandler("Something went wrong mail not send.", 500));
    }
    return res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully!`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return next(new ErrorHandler(`Custome ${err.message}`, 500));
  }
};

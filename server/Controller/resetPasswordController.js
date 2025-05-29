//server\Controller\resetPasswordController.js 
import jwt from "jsonwebtoken";
import User from "../../Model/AuthModel/authUser.js";
import sendEmail from "../../Utils/sendEmail.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

  const resetLink = `${process.env.CLIENT_URL}/auth/reset/${token}`;
  await sendEmail(email, "Reset Password", `Click here to reset your password: ${resetLink}`);

  res.status(200).json({ success: true, message: "Reset link sent to email" });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = password;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

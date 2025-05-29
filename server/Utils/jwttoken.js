import jwt from "jsonwebtoken";

/************************************************************************************
 * Token Generation
 ************************************************************************************/
export const generateToken = (user, message, res, secretKey) => {
  try {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      secretKey,
      { expiresIn: "1d" }
    );

    const cookieName = user?.role?.toLowerCase() || "auth"; // fallback in case role is undefined
    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    };

    res.cookie(cookieName, token, cookieOptions);

    return res.status(200).json({
      success: true,
      message,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Token Generation Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Token generation failed",
    });
  }
};


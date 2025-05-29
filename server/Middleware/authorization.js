/************************************************************************************
 * authorization Middleware
 ************************************************************************************/
export const authorization = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  next();
};

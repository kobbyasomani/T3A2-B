const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).clearCookie("authenticated");
    throw new Error("No authorization token found");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(data.id).select("-password");
    return next();
  } catch {
    console.log(error);
    res.status(401).clearCookie("access_token").clearCookie("authenticated");
    throw new Error("Not authorized");
  }
})
  module.exports = { protect };


//   let token

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       //Get token from header (separates from 'Bearer')
//       token = req.headers.authorization.split(" ")[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       //get user from the token
//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(401);
//       throw new Error("Not authorized");
//     }
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error("No authorization token found");
//   }
// });


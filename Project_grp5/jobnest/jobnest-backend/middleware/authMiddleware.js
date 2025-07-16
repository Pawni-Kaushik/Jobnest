const jwt = require("jsonwebtoken");

// 🔐 Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🧼 Ensure auth header exists and follows "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "🚫 No token provided in header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🧩 Attach user info to request object
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);

    // 🎯 Customize errors for expired or malformed tokens
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "⏰ Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "❌ Invalid token format" });
    }

    return res.status(403).json({ message: "❌ Token authentication failed" });
  }
};

module.exports = { verifyToken };
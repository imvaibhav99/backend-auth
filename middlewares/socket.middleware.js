import jwt from "jsonwebtoken";



// Socket.io middleware to authenticate users using JWT from cookies

export const socketAuthMiddleware = (socket, next) => {
  try {
    const cookie = socket.handshake.headers.cookie;

    if (!cookie) {
      return next(new Error("No cookie found"));
    }

    // Extract token from cookie
    const tokenMatch = cookie.match(/token=([^;]+)/);
    if (!tokenMatch) {
      return next(new Error("No token found in cookie"));
    }

    const token = tokenMatch[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.userId = decoded.userId; // Attach user info to socket
    next();
  } catch (err) {
    console.error("Socket authentication error:", err.message);
    next(new Error("Authentication error"));
  }
};

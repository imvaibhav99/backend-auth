import { Message } from "../models/chat.model.js";
import { catchAsync, AppError } from "../middlewares/error.middleware.js";

// Socket.io controller
export const socketController = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.userId}`);

    // Join room for private chats
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.userId} joined room ${roomId}`);
    });

    // Handle sending messages
    socket.on("sendMessage", async ({ roomId, receiverId, content }) => {
      try {
        const message = new Message({
          sender: socket.userId,
          receiver: receiverId,
          roomId,
          content,
        });
        await message.save();

        // Emit the message to the room (both users)
        io.to(roomId).emit("receiveMessage", message);
      } catch (error) {
        console.error("Message error:", error);
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userId}`);
    });
  });
};

// REST API: Get chat messages by room
export const getMessagesByRoom = catchAsync(async (req, res) => {
  const { roomId } = req.params;

  if (!roomId) throw new AppError("Room ID is required", 400);

  const messages = await Message.find({ roomId })
    .populate("sender", "firstname lastname username")
    .populate("receiver", "firstname lastname username")
    .sort({ createdAt: 1 }); // oldest first

  res.status(200).json({
    success: true,
    messages,
  });
});


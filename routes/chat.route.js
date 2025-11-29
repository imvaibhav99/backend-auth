import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {getMessagesByRoom} from '../controllers/socket.controller.js';

const router = express.Router();

router.get("/:roomId", isAuthenticated, getMessagesByRoom);

export default router;
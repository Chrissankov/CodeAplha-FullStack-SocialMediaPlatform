import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import mongoose from "mongoose";  // Add mongoose import

const router = express.Router();

router.get("/profile", verifyToken, async (req, res) => {
    try {
        console.log("Extracted userId from token:", req.user.userId);

        // Ensure the userId is treated as an ObjectId
        const user = await User.findById(new mongoose.Types.ObjectId(req.user.userId)).select("-password");
        
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

export default router;

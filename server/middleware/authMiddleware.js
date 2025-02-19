import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Remove "Bearer"
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // { userId: "67b508ad05c2370f15b62b71" }
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
};

export default authMiddleware;

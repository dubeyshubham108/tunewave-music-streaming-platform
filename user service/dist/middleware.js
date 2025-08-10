import jwt from "jsonwebtoken";
import User from "./model/js";
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                message: "Please Login",
            });
            return;
        }
        const decodeValue = jwt.verify(token, process.env.JWT_SEC);
        if (!decodeValue || !decodeValue._id) {
            res.status(403).json({
                message: "Invalid token",
            });
            return;
        }
        const userId = decodeValue._id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(403).json({
                message: "User Not Found",
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Please Login",
        });
    }
};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "./model.js";

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuth = async (
    req: AuthenticatedRequest, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.headers.token as string;

        if(!token) {
            res.status(403).json({
                message: "Please Login",
            })
            return;
        }

        const decodeValue = jwt.verify(token, process.env.JWT_SEC as string) as JwtPayload;

        if(!decodeValue || !decodeValue._id) {
            res.status(403).json({
                message: "Invalid token",
            });
            return;
        }

        const userId = decodeValue._id;

        const user = await User.findById(userId).select("-password");

        if(!user) {
            res.status(403).json({
                message: "User Not Found",
            });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Please Login",
        })
    }
}
import jwt from "jsonwebtoken";
import User from '../auth/schema.js';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // Expected format:
        // Authorization: Bearer <token>

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is required"
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN
        );

        // Find user in database
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }

        // Attach authenticated user to request
        req.user = user;

        next();

    } catch (error) {
        console.error(`Error with authenticating user ${error.message}`)

        return res.status(500).json({
            success: false,
            message: "Authentication failed"
        });
    }
};
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const jwtVerification = (req, res, next) => {
	try {
		if (req.headers.authorization) {
			const decode = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
			req.user = decode;
			next();
		} else {
			console.log("no token attached to header");
		}
	} catch (error) {
		res.status(500).json({ status: false, message: "jwt validation error", error });
	}
};

const roleVarification = async (req, res, next) => {
	try {
		const user = await userModel.findById(req.user._id);
		if (user.role !== 1) {
			return res.status(401).json({ status: false, message: "unorthorized access", error });
		} else {
			next();
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
export { jwtVerification, roleVarification };

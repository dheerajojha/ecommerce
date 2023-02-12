import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// const jwtVerification = (req, res, next) => {
// 	try {
// 		const decode = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
// 		req.user(decode);
// 		next();
// 	} catch (error) {
// 		res.status(500).json({ status: false, message: "jwt validation error", error });
// 	}
// };

const roleVarification = async (req, res, next) => {
	try {
		const findUser = await userModel.findById(req.findUser._id);
		console.log(req.findUser._id);
		if (findUser.role !== 1) {
			return res.status(401).json({ status: false, message: "unorthorized access", error });
		} else {
			next();
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
export { roleVarification };

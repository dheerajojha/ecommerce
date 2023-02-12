import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../Helpers/authHelper.js";
import generateToken from "../config/jwt.js";

// REGISTER A USER
const registerController = async (req, res) => {
	const { username, email, password, phone, address } = req.body;
	const hash = await hashPassword(password);
	try {
		// validation
		if (!username || !email || !password || !phone || !address) {
			return res.status(500).json({ status: false, message: "field is required" });
		}
		// check exixting user email
		const findUser = await userModel.findOne({ email });
		if (findUser) {
			return res.status(200).json({
				status: true,
				message: "User already registered",
			});
		} else {
			const registerUser = await userModel.create({
				username,
				email,
				phone,
				address,
				password: hash,
			});
			res.status(201).json({ status: true, message: "user registered successfully", registerUser });
		}
	} catch (error) {
		console.log(error);
	}
};

// LOGIN A USER

const loginController = async (req, res) => {
	const { email, password } = req.body;
	try {
		// validation
		if (!email || !password) {
			return res.status(404).json({ status: false, message: "field is required" });
		}

		// check exixting user email
		const findUser = await userModel.findOne({ email });
		if (!findUser) {
			return res.status(500).json({ status: false, message: "email already exist" });
		}

		const match = await comparePassword(password, findUser.password);
		if (!match) {
			return res.status(500).json({ status: false, message: "password not matched" });
		} else {
			res.status(200).json({
				status: true,
				message: "logged in successfully",
				findUser: {
					username: findUser.email,
					email: findUser.email,
					phone: findUser.phone,
					address: findUser.address,
					token: generateToken({ _id: findUser._id }),
				},
			});
		}
	} catch (error) {
		res.status(500).json({ status: false, message: "error", error });
	}
};

// TEST A USER

const testController = (req, res) => {
	res.status(200).json({ status: true, message: "testing protected route" });
};

export { registerController, loginController, testController };

import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../Helpers/authHelper.js";
import generateToken from "../config/jwt.js";

// REGISTER A USER
const registerController = async (req, res) => {
	const { username, email, phone, address, password, answer } = req.body;
	const hash = await hashPassword(password);
	try {
		// check exixting user email
		const user = await userModel.findOne({ email });
		if (user) {
			return res.status(200).json({
				success: false,
				message: "User already registered",
			});
		} else {
			const registerUser = await userModel.create({
				username: username,
				email: email,
				password: hash,
				phone: phone,
				address: address,
				answer: answer,
			});
			res
				.status(201)
				.json({ success: true, message: "user registered successfully", registerUser });
		}
	} catch (error) {
		console.log(error);
	}
};

// LOGIN A USER

const loginController = async (req, res) => {
	const { email, password } = req.body;
	try {
		// check exixting user email
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(500).json({ success: false, message: "email already exist" });
		}

		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.status(500).json({ success: false, message: "password not matched" });
		} else {
			res.status(200).json({
				success: true,
				message: "logged in successfully",
				user: {
					username: user.email,
					email: user.email,
					phone: user.phone,
					address: user.address,
				},
				token: generateToken({ _id: user._id }),
			});
		}
	} catch (error) {
		res.status(500).json({ success: false, message: "error", error });
	}
};

// TEST A USER

const testController = (req, res) => {
	res.status(200).json({ success: true, message: "testing protected route" });
};

// protected route

const protectedController = (req, res) => {
	res.status(200).json({ ok: true });
};

// Forgot Password

const forgotPasswordController = async (req, res) => {
	const { email, newpassword, answer } = req.body;
	const hash = await hashPassword(newpassword);
	try {
		const user = await userModel.findOne({ email, answer });
		if (!user) {
			return res.status(404).json({ success: false, message: "invalid password or email" });
		} else {
			await userModel.findByIdAndUpdate(user._id, { password: hash });
			res.status(200).json({ success: true, message: "passwordUpdated" });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: "something went wrong", error });
	}
};

export {
	registerController,
	loginController,
	testController,
	protectedController,
	forgotPasswordController,
};

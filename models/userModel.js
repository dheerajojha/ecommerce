import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: "string",
		required: true,
		trim: true,
	},
	email: {
		type: "string",
		required: true,
		unique: true,
	},

	password: {
		type: "string",
		required: true,
	},
	phone: {
		type: Number,
		require: true,
	},
	address: {
		type: "string",
		require: true,
	},
	answer: {
		type: "string",
		require: true,
	},

	role: {
		type: Number,
		default: 0,
	},
});

export default mongoose.model("Users", userSchema);

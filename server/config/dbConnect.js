import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const dbConnect = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL);
		console.log(`connected to mongodb database successfully ${conn.connection.host}`.bgGreen.white);
	} catch (error) {
		console.log(`error connecting to mongodb database ${error}`.bgRed.white);
	}
};

export default dbConnect;

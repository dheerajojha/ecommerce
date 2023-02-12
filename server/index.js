import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import authRoute from "./Routes/authRoute.js";

dotenv.config();
dbConnect();
const app = express();

// Port settings
const PORT = process.env.PORT || 4000;
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
	console.log(`server running on port ${process.env.PORT} in ${process.env.MODE}`.bgCyan.white);
});

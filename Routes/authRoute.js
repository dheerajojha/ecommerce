import express from "express";
import {
	registerController,
	loginController,
	testController,
	protectedController,
	forgotPasswordController,
} from "../Controllers/authCtrl.js";
import { jwtVerification, roleVarification } from "../Middlewares/authMiddleware.js";
const router = express.Router();

// register a user
router.post("/register", registerController);
// login a user
router.post("/login", loginController);
// test a user
router.get("/test", jwtVerification, roleVarification, testController);
// Protected route
router.get("/user-auth", jwtVerification, protectedController);
// Forgotpassword route
router.post("/forgotpassword", forgotPasswordController);
export default router;

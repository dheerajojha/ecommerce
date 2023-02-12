import express from "express";
import { registerController, loginController, testController } from "../Controllers/authCtrl.js";
import { roleVarification } from "../Middlewares/authMiddleware.js";
const router = express.Router();

// register a user
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", roleVarification, testController);
export default router;

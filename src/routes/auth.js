import { Router } from "express";
import SignInController from "../controller/auth/SignInController.js";
import SignUpController from "../controller/auth/SignUpController.js";
import SignOutController from "../controller/auth/SignOutController.js";
import verifyAccessToken from "../middleware/verifyAccessToken.js";
import verifyAccessController from "../controller/auth/verifyAccessController.js";
const router = Router();

router.post("/signup", SignUpController);
router.post("/signin", SignInController);
router.get("/verify-access", verifyAccessToken, verifyAccessController);
router.get("/signout", verifyAccessToken, SignOutController);

export default router;

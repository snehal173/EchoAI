import { Router } from "express";
import { register,login, getProfile, logout, getAllUsers, googleLogin } from "../controllers/authController.js";
import { authUser } from "../middleware/authMiddleware.js";
const router=Router();

router.post("/register",register);

router.post("/login",login);
router.get("/profile",authUser,getProfile);
router.get("/all",authUser,getAllUsers);
router.get("/logout",logout);

export default router;
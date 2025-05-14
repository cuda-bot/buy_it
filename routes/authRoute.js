import express from "express";
import {
  getAllOrdersController,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  resetPasswordController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//REGISTER
router.post("/register", registerController);
//LOGIN
router.post("/login", loginController);
//RESET-PASSWORD
router.post("/resetpassword", resetPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//dashboard access for user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//dashboard access for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//UPDATE PROFILE
router.put("/profile", requireSignIn, updateProfileController);

//get orders for user
router.get("/orders", requireSignIn, getOrdersController);

//get orders for admin
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put("/order-status/:oid", requireSignIn, isAdmin, orderStatusController);
export default router;

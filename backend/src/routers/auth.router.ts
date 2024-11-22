import { Router } from "express"
import rescue from "express-rescue"
import authController from "../controllers/auth.controller"

const authRouter = Router()

authRouter.route("/login").post(rescue(authController.authenticate))
authRouter.route("/register").post(authController.register)
authRouter.route("/me").get(authController.getMe)

export default authRouter

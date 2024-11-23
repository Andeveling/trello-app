import { Router } from "express"
import TaskController from "../controllers/task.controller"
import rescue from "express-rescue"
import authMiddleware from "../middlewares/auth"

const router = Router()

router.route("/").post(authMiddleware, rescue(TaskController.create))
router.route("/:id").get(authMiddleware, rescue(TaskController.getById))
router.route("/:id").put(authMiddleware, rescue(TaskController.update))
router.route("/:id/position").put(authMiddleware, rescue(TaskController.updateTaskPosition))
router.route("/:id").delete(authMiddleware, rescue(TaskController.delete))
router.route("/:taskId/assign/:userId").put(authMiddleware, rescue(TaskController.assignTask))


export default router

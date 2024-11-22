import { Router } from "express"
import TaskController from "../controllers/task.controller"
import rescue from "express-rescue"
import authMiddleware from "../middlewares/auth"

const router = Router()

// Crear una nueva tarea
router.route("/").post(authMiddleware, rescue(TaskController.create))
router.route("/:id").get(authMiddleware, rescue(TaskController.getById))
router.route("/:id").put(authMiddleware, rescue(TaskController.update))
router.route("/:id/position").put(authMiddleware, rescue(TaskController.updateTaskPosition))
router.route("/:id").delete(authMiddleware, rescue(TaskController.delete))


export default router

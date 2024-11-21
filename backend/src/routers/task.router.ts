import { Router } from "express"
import rescue from "express-rescue"
import taskController from "../controllers/task.controller"
import authMiddleware from "../middlewares/auth"

const taskRouter = Router()

// Ruta para crear una nueva tarea
taskRouter.route("/").post(authMiddleware, rescue(taskController.create))

// Ruta para obtener todas las tareas de un proyecto
taskRouter.route("/project/:projectId").get(authMiddleware, rescue(taskController.getByProjectId))

// Ruta para obtener una tarea por ID
taskRouter.route("/:id").get(authMiddleware, rescue(taskController.getByProjectId))

// Ruta para actualizar una tarea
taskRouter.route("/:id").put(authMiddleware, rescue(taskController.update))

// Ruta para eliminar una tarea
taskRouter.route("/:id").delete(authMiddleware, rescue(taskController.delete))

// Ruta para cambiar el estado de una tarea
taskRouter.route("/:id/status").put(authMiddleware, rescue(taskController.updateStatus))

export default taskRouter

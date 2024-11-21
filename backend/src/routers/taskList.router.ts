import { Router } from "express"
import rescue from "express-rescue"
import taskListController from "../controllers/taskList.controller"
import authMiddleware from "../middlewares/auth"

const taskListRouter = Router()

// Ruta para crear una nueva lista de tareas
taskListRouter.route("/").post(authMiddleware, rescue(taskListController.create))

// Ruta para obtener todas las listas de tareas de un usuario
taskListRouter.route("/:userId").get(authMiddleware, rescue(taskListController.getByUserId))

// Ruta para obtener una lista de tareas por ID
taskListRouter.route("/:id").get(authMiddleware, rescue(taskListController.getByUserId))

// Ruta para actualizar una lista de tareas
taskListRouter.route("/:id").put(authMiddleware, rescue(taskListController.update))

// Ruta para eliminar una lista de tareas
taskListRouter.route("/:id").delete(authMiddleware, rescue(taskListController.delete))

export default taskListRouter

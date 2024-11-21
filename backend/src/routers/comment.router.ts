import { Router } from "express"
import rescue from "express-rescue"
import commentController from "../controllers/comment.controller"
import authMiddleware from "../middlewares/auth"

const commentRouter = Router()

// Ruta para agregar un comentario a una tarea
commentRouter.route("/").post(authMiddleware, rescue(commentController.create))

// Ruta para obtener todos los comentarios de una tarea
commentRouter.route("/task/:taskId").get(authMiddleware, rescue(commentController.getByTaskId))

// Ruta para obtener un comentario por ID
commentRouter.route("/:id").get(authMiddleware, rescue(commentController.getByTaskId))

// Ruta para actualizar un comentario
commentRouter.route("/:id").put(authMiddleware, rescue(commentController.update))

// Ruta para eliminar un comentario
commentRouter.route("/:id").delete(authMiddleware, rescue(commentController.delete))

export default commentRouter

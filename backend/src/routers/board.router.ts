import { Router } from "express"
import rescue from "express-rescue"
import boardController from "../controllers/board.controller"
import authMiddleware from "../middlewares/auth"

const boardRouter = Router()

// Ruta para crear un proyecto
boardRouter.route("/").post(authMiddleware, rescue(boardController.create))

// Ruta para obtener todos los proyectos de un usuario
boardRouter.route("/user").get(authMiddleware, rescue(boardController.getByUserId))

// Ruta para obtener un proyecto por ID
boardRouter.route("/:id").get(authMiddleware, rescue(boardController.getById))

// Ruta para actualizar un proyecto
boardRouter.route("/:id").put(authMiddleware, rescue(boardController.update))

// Ruta para eliminar un proyecto
boardRouter.route("/:id").delete(authMiddleware, rescue(boardController.delete))

export default boardRouter

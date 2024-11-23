import { Router } from "express"
import rescue from "express-rescue"
import boardController from "../controllers/board.controller"
import authMiddleware from "../middlewares/auth"

const boardRouter = Router()

// Ruta para crear un tablero
boardRouter.route("/").post(authMiddleware, rescue(boardController.create))

boardRouter.route("/:boardId/columns").get(authMiddleware, rescue(boardController.getColumnsByBoardId))

// Ruta para obtener todos los tableros de un usuario
boardRouter.route("/user").get(authMiddleware, rescue(boardController.getByUserId))

// Ruta para obtener un tablero por ID
boardRouter.route("/:id").get(authMiddleware, rescue(boardController.getById))

boardRouter.route("/:boardId/members").get(authMiddleware, rescue(boardController.getMembersByBoardId))

// Ruta para actualizar un tablero
boardRouter.route("/:id").put(authMiddleware, rescue(boardController.update))

// Ruta para eliminar un tablero
boardRouter.route("/:id").delete(authMiddleware, rescue(boardController.delete))

export default boardRouter

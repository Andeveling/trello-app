import { Router } from "express"
import rescue from "express-rescue"
import columnController from "../controllers/column.controller"
import authMiddleware from "../middlewares/auth"

const columnRouter = Router()

// Ruta para crear una columna
columnRouter.route("/").post(authMiddleware, rescue(columnController.create))

// Ruta para obtener todas las columnas de un tablero
columnRouter.route("/board/:boardId").get(authMiddleware, rescue(columnController.getByBoardId))

// Ruta para obtener una columna por ID
columnRouter.route("/:id").get(authMiddleware, rescue(columnController.getById))

// Ruta para actualizar una columna
columnRouter.route("/:id").put(authMiddleware, rescue(columnController.update))

// Ruta para eliminar una columna
columnRouter.route("/:id").delete(authMiddleware, rescue(columnController.delete))

export default columnRouter

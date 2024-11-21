import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prisma"

class ColumnController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name, boardId, status } = req.body

    try {
      const position = await prisma.column.count({
        where: { boardId: Number(boardId) },
      })

      const newColumn = await prisma.column.create({
        data: {
          name,
          position,
          boardId,
          status,
        },
      })

      res.status(StatusCodes.CREATED).json(newColumn)
    } catch (error) {
      next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error creating column",
      })
    }
  }

  // Método para obtener una columna por su ID
  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const column = await prisma.column.findUnique({
        where: { id: Number(id) },
        include: {
          tasks: true, // Si necesitas incluir las tareas asociadas a la columna
        },
      })

      if (!column) {
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Column not found",
        })
      }

      res.status(StatusCodes.OK).json(column)
    } catch (error) {
      next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching column",
      })
    }
  }

  // Método para obtener todas las columnas de un tablero
  async getByBoardId(req: Request, res: Response, next: NextFunction) {
    const { boardId } = req.params

    console.log(boardId)
    try {
      const columns = await prisma.column.findMany({
        where: { boardId: Number(boardId) },
        include: {
          tasks: true, // Incluye tareas si es necesario
        },
      })

      res.status(StatusCodes.OK).json(columns)
    } catch (error) {
      next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching columns",
      })
    }
  }

  // Método para actualizar una columna
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { name, position, status } = req.body

    try {
      const updatedColumn = await prisma.column.update({
        where: { id: Number(id) },
        data: {
          name,
          position,
          status,
        },
      })

      res.status(StatusCodes.OK).json(updatedColumn)
    } catch (error) {
      next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error updating column",
      })
    }
  }

  // Método para eliminar una columna
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const deletedColumn = await prisma.column.delete({
        where: { id: Number(id) },
      })

      res.status(StatusCodes.OK).json(deletedColumn)
    } catch (error) {
      next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error deleting column",
      })
    }
  }
}

export default new ColumnController()

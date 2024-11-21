import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prisma"

class BoardController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name, description } = req.body

    if (!name) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Board name is required",
      })
    }

    const user = res.locals.user

    try {
      const newBoard = await prisma.board.create({
        data: {
          name,
          description,
          owner: {
            connect: { id: user.id },
          },
          members: {
            create: {
              userId: user.id,
              role: "OWNER",
            },
          },
        },
        include: {
          members: true,
        },
      })

      res.status(StatusCodes.CREATED).json(newBoard)
    } catch (error) {
      console.error(error)
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error creating board",
      })
    }
  }

  async getByUserId(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user

    try {
      const boards = await prisma.board.findMany({
        where: {
          OR: [
            { ownerId: user.id }, // Tableros donde el usuario es propietario
            { members: { some: { userId: user.id } } }, // Tableros donde el usuario es miembro
          ],
        },
        include: {
          members: {
            include: {
              user: { select: { id: true, name: true, email: true } },
            },
          },
        },
      })

      if (!boards.length) {
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "No boards found",
        })
      }

      res.status(StatusCodes.OK).json(boards)
    } catch (error) {
      console.error(error) // Para depurar errores
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching boards",
      })
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const board = await prisma.board.findUnique({
        where: { id: Number(id) },
        include: {
          columns: {
            include: {
              tasks: { select: { id: true, title: true } }, 
            },
          },
          members: {
            include: {
              user: { select: { id: true, name: true, email: true } },
            },
          },
        },
      })

      if (!board) {
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Board not found",
        })
      }

      res.status(StatusCodes.OK).json(board)
    } catch (error) {
      console.error(error)
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching board",
      })
    }
  }

  // Actualizar un proyecto
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { name, description } = req.body

    try {
      const updatedBoard = await prisma.board.update({
        where: { id: Number(id) },
        data: { name, description },
      })

      res.status(StatusCodes.OK).json(updatedBoard)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error updating board",
      })
    }
  }

  // Eliminar un proyecto
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      await prisma.board.delete({
        where: { id: Number(id) },
      })

      res.status(StatusCodes.NO_CONTENT).json({ message: "board deleted" })
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error deleting board",
      })
    }
  }
}

export default new BoardController()

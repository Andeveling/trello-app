import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prisma"

class CommentController {
  // Crear un nuevo comentario
  async create(req: Request, res: Response, next: NextFunction) {
    const { content, taskId, userId } = req.body

    if (!content || !taskId || !userId) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Some required fields are missing",
      })
    }

    try {
      const newComment = await prisma.comment.create({
        data: {
          content,
          taskId,
          userId,
        },
      })

      res.status(StatusCodes.CREATED).json(newComment)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error creating comment",
      })
    }
  }

  // Obtener todos los comentarios de una tarea
  async getByTaskId(req: Request, res: Response, next: NextFunction) {
    const { taskId } = req.params

    try {
      const comments = await prisma.comment.findMany({
        where: { taskId: Number(taskId) },
        include: { user: true },
      })

      if (!comments.length) {
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "No comments found for this task",
        })
      }

      res.status(StatusCodes.OK).json(comments)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching comments",
      })
    }
  }

  // Actualizar un comentario
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { content } = req.body

    try {
      const updatedComment = await prisma.comment.update({
        where: { id: Number(id) },
        data: { content },
      })

      res.status(StatusCodes.OK).json(updatedComment)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error updating comment",
      })
    }
  }

  // Eliminar un comentario
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      await prisma.comment.delete({
        where: { id: Number(id) },
      })

      res.status(StatusCodes.NO_CONTENT).json({ message: "Comment deleted" })
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error deleting comment",
      })
    }
  }
}

export default new CommentController()

import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prisma"

class TaskListController {
  // Crear una nueva lista de tareas
  async create(req: Request, res: Response, next: NextFunction) {
    const { name, userId } = req.body

    if (!name || !userId) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Some required fields are missing",
      })
    }

    try {
      const newTaskList = await prisma.taskList.create({
        data: { name, userId },
      })

      res.status(StatusCodes.CREATED).json(newTaskList)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error creating task list",
      })
    }
  }

  // Obtener todas las listas de tareas de un usuario
  async getByUserId(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params

    try {
      const taskLists = await prisma.taskList.findMany({
        where: { userId: Number(userId) },
        include: { tasks: true },
      })

      if (!taskLists.length) {
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "No task lists found for this user",
        })
      }

      res.status(StatusCodes.OK).json(taskLists)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching task lists",
      })
    }
  }

  // Actualizar una lista de tareas
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { name } = req.body

    try {
      const updatedTaskList = await prisma.taskList.update({
        where: { id: Number(id) },
        data: { name },
      })

      res.status(StatusCodes.OK).json(updatedTaskList)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error updating task list",
      })
    }
  }

  // Eliminar una lista de tareas
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      await prisma.taskList.delete({
        where: { id: Number(id) },
      })

      res.status(StatusCodes.NO_CONTENT).json({ message: "Task list deleted" })
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error deleting task list",
      })
    }
  }
}

export default new TaskListController()

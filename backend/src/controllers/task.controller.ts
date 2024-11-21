import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prisma"

class TaskController {
  // Crear una nueva tarea
  async create(req: Request, res: Response, next: NextFunction) {
    const { title, description, projectId, taskListId } = req.body

    if (!title || !projectId || !taskListId) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Some required fields are missing",
      })
    }

    try {
      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          projectId,
          taskListId,
        },
      })

      res.status(StatusCodes.CREATED).json(newTask)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error creating task",
      })
    }
  }

  // Obtener todas las tareas de un proyecto
  async getByProjectId(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params

    try {
      const tasks = await prisma.task.findMany({
        where: { projectId: Number(projectId) },
      })

      if (!tasks.length) {
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "No tasks found for this project",
        })
      }

      res.status(StatusCodes.OK).json(tasks)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching tasks",
      })
    }
  }

  // Actualizar una tarea
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { title, description, status, assignedToId } = req.body

    try {
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          status,
          assignedToId,
        },
      })

      res.status(StatusCodes.OK).json(updatedTask)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error updating task",
      })
    }
  }

  // Actualizar el estado de la tarea
  async updateStatus(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { status } = req.body

    try {
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { status },
      })

      res.status(StatusCodes.OK).json(updatedTask)
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error updating task status",
      })
    }
  }

  // Eliminar una tarea
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      await prisma.task.delete({
        where: { id: Number(id) },
      })

      res.status(StatusCodes.NO_CONTENT).json({ message: "Task deleted" })
    } catch (error) {
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error deleting task",
      })
    }
  }
}

export default new TaskController()

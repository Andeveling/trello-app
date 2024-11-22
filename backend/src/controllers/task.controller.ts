import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prisma"

class TaskController {
  // Crear una nueva tarea
  async create(req: Request, res: Response, next: NextFunction) {
    const { title, description, columnId, assignedToId } = req.body

    if (!title || !columnId) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Title and columnId are required",
      })
    }

    try {
      // Calcular la posición para la nueva tarea
      const lastTask = await prisma.task.findFirst({
        where: { columnId: Number(columnId) },
        orderBy: { position: "desc" },
      })

      const position = lastTask ? lastTask.position + 1 : 1

      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          position,
          columnId: Number(columnId),
          assignedToId: assignedToId ? Number(assignedToId) : null,
        },
      })

      res.status(StatusCodes.CREATED).json(newTask)
    } catch (error) {
      next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error creating task",
      })
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
        include: {
          column: true,
          assignedTo: true,
        },
      })

      if (!task) {
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Task not found",
        })
      }

      res.status(StatusCodes.OK).json(task)
    } catch (error) {
      next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching task",
      })
    }
  }

  // Obtener tareas por columna
  async getByColumnId(req: Request, res: Response, next: NextFunction) {
    const { columnId } = req.params
    console.log(`ColumnId`, columnId)
    try {
      const tasks = await prisma.task.findMany({
        where: { columnId: Number(columnId) },
        orderBy: { position: "asc" },
      })
      console.log(`Tasks`, tasks)

      res.status(StatusCodes.OK).json(tasks)
    } catch (error) {
      next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching tasks for the column",
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
          assignedToId: assignedToId ? Number(assignedToId) : null,
        },
      })

      res.status(StatusCodes.OK).json(updatedTask)
    } catch (error) {
      next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error updating task",
      })
    }
  }

  async updateTaskPosition(req: Request, res: Response, next: NextFunction) {
    const { taskId, sourceColumnId, destinationColumnId } = req.body
    console.log("taskId, sourceColumnId, destinationColumnId", taskId, sourceColumnId, destinationColumnId)
    if (!taskId || !sourceColumnId || !destinationColumnId) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "taskId, sourceColumnId, and destinationColumnId are required",
      })
    }

    try {
      // Verificar que la tarea exista
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      })

      if (!task) {
        return next({
          status: StatusCodes.NOT_FOUND,
          message: "Task not found",
        })
      }

      // Obtener la posición en la columna destino
      const destinationTasksCount = await prisma.task.count({
        where: { columnId: destinationColumnId },
      })
      console.log("destinationTasksCount", destinationTasksCount)

      // Nueva posición para la tarea en la columna destino
      const newPosition = destinationTasksCount + 1
      console.log("newPosition", newPosition)
      // Actualizar la tarea con la nueva posición y columna
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          columnId: destinationColumnId,
          position: newPosition,
        },
      })

      // // Reajustar las posiciones de las tareas en las columnas
      // await this.updateColumnTasksPosition(sourceColumnId)
      // await this.updateColumnTasksPosition(destinationColumnId)

      res.status(StatusCodes.OK).json(updatedTask)
    } catch (error) {
      console.error("Error updating task position:", error)
      return next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error updating task position",
      })
    }
  }

  // Reajustar la posición de las tareas después de mover una
  private async updateColumnTasksPosition(columnId: number) {
    const tasks = await prisma.task.findMany({
      where: { columnId },
      orderBy: { position: "asc" },
    })

    for (let i = 0; i < tasks.length; i++) {
      await prisma.task.update({
        where: { id: tasks[i].id },
        data: { position: i + 1 },
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

      res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
      next({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error deleting task",
      })
    }
  }
}

export default new TaskController()

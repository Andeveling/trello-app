import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../api/api"
import type { TaskFormData } from "../schemas/task.schema"
import { assignedToTask } from "../services/task.service"

export const useTaskMutation = ({ onClose }: { onClose?: () => void }) => {
  const queryClient = useQueryClient()

  // Crear tarea
  const createTaskMutation = useMutation({
    mutationFn: async (data: TaskFormData) => {
      const response = await api.post("/tasks", {
        title: data.title,
        description: data.description,
        columnId: data.columnId,
        assignedToId: data.assignedToId,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "columns"],
      })
      if (onClose) onClose()
    },
    onError: (error) => {
      console.error("Error creating task:", error)
    },
  })

  // Actualizar tarea
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<TaskFormData> }) => {
      const response = await api.put(`/tasks/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "columns"],
      })
      if (onClose) onClose()
    },
    onError: (error) => {
      console.error("Error updating task:", error)
    },
  })

  // Eliminar tarea
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/tasks/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "columns"],
      })
    },
    onError: (error) => {
      console.error("Error deleting task:", error)
    },
  })

  const moveTaskMutation = useMutation({
    mutationFn: async ({
      taskId,
      sourceColumnId,
      destinationColumnId,
      newPosition,
    }: {
      taskId: number
      sourceColumnId: number
      destinationColumnId: number
      newPosition: number
    }) => {
      const response = await api.put(`/tasks/${taskId}/position`, {
        taskId, // ID de la tarea a mover
        sourceColumnId, // ID de la columna de origen
        destinationColumnId, // ID de la columna destino
        newPosition, // Nueva posición de la tarea
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "columns"], // Invalida las queries de tareas y columnas para obtener datos actualizados
      })
    },
    onError: (error) => {
      console.error("Error moving task:", error)
    },
  })

  const assignedToTaskMutation = useMutation({
    mutationFn: ({ taskId, userId }: { taskId: number; userId: number }) => assignedToTask(taskId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "columns"],
      })
    },
    onError: (error) => {
      console.error("Error assigning task:", error)
    },
  })

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    moveTaskMutation,
    assignedToTaskMutation,
  }
}

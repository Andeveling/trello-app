import { api } from "../api/api"
import type { Task } from "../types"

export const getTasksByColumnId = async (columnId: number) => {
  const response = await api.get<Task[]>(`/tasks/column/${columnId}`)
  return response.data
}

export const createTask = async (data: Omit<Task, "id">) => {
  const response = await api.post(`/tasks`, data)
  return response.data
}

export const updateTask = async (id: number, data: Partial<Task>) => {
  const response = await api.put(`/tasks/${id}`, data)
  return response.data
}

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`)
}

export const moveTask = async (id: number, data: any) => {
  const response = await api.put(`/tasks/${id}/position`, data)
  return response.data
}

export const assignedToTask = async (taskId: number, userId: number) => {
  const response = await api.put(`/tasks/${taskId}/assign/${userId}`)
  return response.data
}

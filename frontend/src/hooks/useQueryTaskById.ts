import type { Task } from "../types"
import { api } from "../api/api"
import { useQuery } from "@tanstack/react-query"

export const useQueryTaskById = (taskId: number) => {
  return useQuery<Task>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get(`/tasks/${taskId}`)
      return response.data
    },
  })
}

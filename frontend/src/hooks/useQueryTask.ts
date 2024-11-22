import { Task } from "../types"
import { api } from "../api/api"
import { useQuery } from "@tanstack/react-query"

export const useQueryTask = (columnId: number) => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get(`/tasks/column/${columnId}`)
      return response.data
    },

  })
}

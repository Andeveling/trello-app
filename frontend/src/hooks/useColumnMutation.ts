import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ColumnFormData } from "../schemas/column.schema"
import { api } from "../api/api"

export const useColumnMutation = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: ColumnFormData) => {
      const response = await api.post("/columns", {
        name: data.name,
        status: data.status,
        boardId: data.boardId,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns"],
      })
      onClose()
    },
    onError: (error: any) => {
      console.error("Error in creating column:", error)
    },
  })
}

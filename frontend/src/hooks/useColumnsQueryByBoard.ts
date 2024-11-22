import { useQuery } from "@tanstack/react-query"
import { getColumnsByBoardId } from "../services/board.service"

export const useColumnsQueryByBoard = (boardId: number) => {
  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => getColumnsByBoardId(boardId),
    enabled: !!boardId,
    initialData: [],
  })
}

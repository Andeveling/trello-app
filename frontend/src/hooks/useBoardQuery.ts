import { useQuery } from "@tanstack/react-query"
import { getBoard } from "../services/board.service"

export const useBoardQuery = (boardId: number) => {
  return useQuery({
    queryKey: ["boards", boardId],
    queryFn: () => getBoard(boardId),
  })
}

import { useQuery } from "@tanstack/react-query"
import { getMembersByBoardId } from "../services/user.service"

export const useMembersBoardQuery = (boardId: number) => {
  return useQuery({
    queryKey: ["members", boardId],
    queryFn: () => getMembersByBoardId(boardId),
    initialData: [],
  })
}

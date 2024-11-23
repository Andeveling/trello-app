
import { api } from "../api/api"
import type { BoardMember, User } from "../types"

export const getMembersByBoardId = async (boardId: number): Promise<BoardMember[]> => {
  const response = await api.get(`/boards/${boardId}/members`)
  return response.data
}
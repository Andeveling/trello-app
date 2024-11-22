import { api } from "../api/api"
import { Board, Column } from "../types"

// Función para obtener todos los boards
export const getBoards = async (): Promise<Board[]> => {
  const response = await api.get<Board[]>("/boards")
  return response.data
}

// Función para obtener un board específico por su ID
export const getBoard = async (boardId: number): Promise<Board> => {
  const response = await api.get<Board>(`/boards/${boardId}`)
  return response.data
}

export const getColumnsByBoardId = async (boardId: number): Promise<Column[]> => {
  const response = await api.get<Column[]>(`/boards/${boardId}/columns`)
  return response.data
}
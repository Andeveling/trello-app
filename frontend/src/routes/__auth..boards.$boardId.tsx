import { createFileRoute } from "@tanstack/react-router"
import { api } from "../api/api"
import BoardPage from "../pages/boards/BoardPage"
import { Board } from "../types"

export const Route = createFileRoute("/__auth/boards/$boardId")({
  loader: async ({ params: { boardId } }) => {
    const fetchedBoard = await api.get<Board>(`/boards/${boardId}`).then((response) => response.data)
    return { board: fetchedBoard }
  },
  component: BoardPage,
})

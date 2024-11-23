import { DndContext, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core"
import { Box, Paper, Stack } from "@mui/material"
import type React from "react"
import { useParams } from "react-router-dom"
import { useColumnsQueryByBoard } from "../../hooks/useColumnsQueryByBoard"
import { useTaskMutation } from "../../hooks/useTaskMutation"
import ColumnComponent from "../Column/ColumnComponent"

const Board: React.FC = () => {
  const { boardId } = useParams()
  const { data: columns } = useColumnsQueryByBoard(Number(boardId))
  const { moveTaskMutation } = useTaskMutation({ onClose: () => console.log("close") })

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over) {
      const sourceColumnIndex = columns.findIndex((column) => column.tasks.some((task) => task.id === active.id))
      const destinationColumnIndex = columns.findIndex((column) => column.id === over.id)

      if (sourceColumnIndex !== destinationColumnIndex) {
        const sourceColumn = columns[sourceColumnIndex]
        const destinationColumn = columns[destinationColumnIndex]

        const movedTask = sourceColumn.tasks.find((task) => task.id === active.id)

        if (movedTask) {
          const newPosition = destinationColumn.tasks.length + 1

          moveTaskMutation.mutate({
            taskId: movedTask.id,
            sourceColumnId: sourceColumn.id,
            destinationColumnId: destinationColumn.id,
            newPosition: newPosition,
          })

          sourceColumn.tasks = sourceColumn.tasks.filter((task) => task.id !== active.id)
          destinationColumn.tasks.push(movedTask)
        }
      }
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    console.log(active)
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Box component={Paper} elevation={0} variant='outlined' sx={{ height: "100%", width: "100%" }}>
        <Stack direction={"row"} spacing={2}>
          {columns?.map((column) => (
            <Stack key={column.id} direction={"column"} spacing={2}>
              <ColumnComponent column={column} />
            </Stack>
          ))}
        </Stack>
      </Box>
    </DndContext>
  )
}

export default Board

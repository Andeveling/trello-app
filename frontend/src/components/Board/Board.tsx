import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import { Box, Paper, Stack } from "@mui/material"
import React from "react"
import ColumnComponent from "../Column/ColumnComponent"
import { useParams } from "react-router-dom"
import { useColumnsQueryByBoard } from "../../hooks/useColumnsQueryByBoard"
import { useTaskMutation } from "../../hooks/useTaskMutation"

const Board: React.FC = () => {
  const { boardId } = useParams()
  const { data: columns } = useColumnsQueryByBoard(Number(boardId))
  const { moveTaskMutation } = useTaskMutation({ onClose: () => console.log("close") })

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event

  if (over) {
    // Encontrar las columnas de origen y destino
    const sourceColumnIndex = columns.findIndex((column) =>
      column.tasks.some((task) => task.id === active.id)
    )
    const destinationColumnIndex = columns.findIndex((column) => column.id === over.id)

    if (sourceColumnIndex !== destinationColumnIndex) {
      const sourceColumn = columns[sourceColumnIndex]
      const destinationColumn = columns[destinationColumnIndex]

      // Obtener la tarea que se está moviendo
      const movedTask = sourceColumn.tasks.find((task) => task.id === active.id)

      if (movedTask) {
        // Calcular la nueva posición de la tarea en la columna destino
        const newPosition = destinationColumn.tasks.length + 1

        // Llamar a la mutación para mover la tarea
        moveTaskMutation.mutate({
          taskId: movedTask.id,
          sourceColumnId: sourceColumn.id,
          destinationColumnId: destinationColumn.id,
          newPosition: newPosition, // Nueva posición en la columna destino
        })

        // Opcional: Actualizar el estado local de las columnas, si no estás usando cache global
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

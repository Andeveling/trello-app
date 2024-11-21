import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { Box, Paper, Stack } from "@mui/material"
import React, { useState } from "react"
import ColumnComponent from "../Column/ColumnComponent"
import { useQuery } from "@tanstack/react-query"
import { api } from "../../api/api"
import { Column } from "../../types"
import { useParams } from "@tanstack/react-router"

const Board: React.FC = () => {
  const { boardId } = useParams({
    from: "/__auth/boards/$boardId",
  })
  const { data: columns } = useQuery({
    queryKey: ["columns"],
    queryFn: async () => {
      const response = await api.get<Column[]>(`/columns/board/${boardId}`)
      return response.data
    },
    initialData: [],
  })

  console.log(columns)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    // Lógica para reordenar o mover una tarea entre columnas
    if (over) {
      const sourceColumnIndex = columns.findIndex((column) => column.tasks.some((task) => task.id === active.id))
      const destinationColumnIndex = columns.findIndex((column) => column.id === over.id)

      if (sourceColumnIndex !== destinationColumnIndex) {
        // Mover la tarea entre columnas
        const sourceColumn = columns[sourceColumnIndex]
        const destinationColumn = columns[destinationColumnIndex]

        const movedTask = sourceColumn.tasks.find((task) => task.id === active.id)

        if (movedTask) {
          // Eliminar la tarea de la columna de origen
          sourceColumn.tasks = sourceColumn.tasks.filter((task) => task.id !== active.id)

          // Agregar la tarea a la columna de destino
          destinationColumn.tasks.push(movedTask)

          // Actualizar el estado de las columnas
          // setColumns([...columns])
        }
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
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

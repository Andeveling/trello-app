import { Box, Card, CardContent, Chip, Typography } from "@mui/material"
import React, { useState } from "react"
import { TaskStatus } from "../types"

interface TaskCardProps {
  task: {
    id: number
    title: string
    description: string
    status: TaskStatus
    assignedTo: { name: string } | null
  }
  onDragStart: (task: any) => void
  onDragEnd: () => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, onDragEnd }) => {
  const [isDragging, setIsDragging] = useState(false) // Estado para saber si la tarjeta está siendo arrastrada

  const { title, description, status, assignedTo } = task

  // Eventos de drag
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("task", JSON.stringify(task))
    setIsDragging(true) // Activa el estado de arrastre
    onDragStart(task)
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false) // Desactiva el estado de arrastre
    onDragEnd()
  }

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sx={{
        width: 250,
        marginBottom: 2,
        backgroundColor: isDragging ? "#fff" : "#f4f6f8", // Cambia el color cuando está siendo arrastrada
        boxShadow: isDragging ? 4 : 2, // Cambia la sombra cuando está siendo arrastrada
        opacity: isDragging ? 0.9 : 1, // Reduce la opacidad cuando está siendo arrastrada
        transition: "all 0.2s ease-in-out", // Transición suave para los cambios de estilo
      }}>
      <CardContent>
        <Typography variant='h6' component='div' fontWeight='bold'>
          {title}
        </Typography>
        <Typography variant='body2' color='textSecondary' sx={{ marginTop: 1 }}>
          {description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Chip
            label={status}
            color={status === "TODO" ? "primary" : status === "IN_PROGRESS" ? "warning" : "success"}
          />
          {assignedTo && (
            <Typography variant='body2' color='textSecondary'>
              Assigned to: {assignedTo.name}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default TaskCard

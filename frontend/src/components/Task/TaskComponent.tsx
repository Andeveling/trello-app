import { useDraggable } from "@dnd-kit/core"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import type React from "react"
import { useState } from "react"
import type { Task } from "../../types"
import TaskModal from "./TaskModal"
import { useModal } from "../../hooks/useModal"

interface TaskComponentProps {
  task: Task
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: task.id.toString(),
  })

  const draggingStyle = isDragging
    ? {
        position: "absolute",
        zIndex: 9999,
        pointerEvents: "none", // Deshabilitar interacciones mientras se arrastra
        transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
      }
    : {}

  const { handleClose, handleOpen, open } = useModal()
      
  return (
    <>
      <Card
        {...attributes}
        onClick={handleOpen}
        ref={setNodeRef}
        variant='outlined'
        sx={{
          minWidth: "280px",
          marginBottom: 1,
          backgroundColor: "white",
          borderRadius: 1,
          cursor: "pointer",
          ...draggingStyle,
          "&:hover": {
            backgroundColor: "rgba(24, 192, 245, 0.1)",
          },
        }}>
        <CardHeader
          action={
            <IconButton sx={{ cursor: isDragging ? "grabbing" : "move" }} {...listeners}>
              <DragIndicatorIcon />
            </IconButton>
          }
          title={<Typography variant='h6'>{task.title}</Typography>}
        />
        <CardContent>{task.description?.slice(0, 30)}...</CardContent>
      </Card>
      <TaskModal task={task} open={open} onClose={handleClose} />
    </>
  )
}

export default TaskComponent

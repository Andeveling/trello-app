import React from "react"
import { Box } from "@mui/material"
import { useDraggable } from "@dnd-kit/core"
import { Task } from "../../types"

interface TaskComponentProps {
  task: Task
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: task.id,
  })

  const draggingStyle = isDragging
    ? {
        position: "absolute",
        zIndex: 9999,
        pointerEvents: "none",
        transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
      }
    : {}

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        border: "1px solid gray",
        minWidth: "280px",
        padding: 1,
        marginBottom: 1,
        backgroundColor: "white",
        borderRadius: 1,
        cursor: "move",
        ...draggingStyle, // Agregar estilo de arrastre
      }}>
      {task.title}
    </Box>
  )
}

export default TaskComponent

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Card, CardActions, CardContent, CardHeader } from "@mui/material"
import type React from "react"
import type { Column } from "../../types"
import TaskAction from "../Task/TasckAction"
import TaskComponent from "../Task/TaskComponent"
import ColumnActions from "./ColumnActions"

interface ColumnComponentProps {
  column: Column
}

const ColumnComponent: React.FC<ColumnComponentProps> = ({ column }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  // Estilos dinámicos cuando una tarea está sobre la columna
  const columnStyles = isOver
    ? {
        border: "4px dashed #18c0f54d", // Borde verde claro cuando está sobre la columna
        backgroundColor: "rgba(24, 192, 245, 0.3)", // Fondo azul suave
      }
    : {}


  return (
    <Card
      ref={setNodeRef}
      variant='outlined'
      sx={{
        height: "100%",
        minWidth: "300px",
        ...columnStyles, // Aplicar los estilos cuando una tarea está sobre la columna
        transition: "all 0.3s ease", // Transición suave para el cambio de estilo
      }}>
      <CardHeader title={column.name} action={<ColumnActions column={column} />} />
      <CardContent>
        {column.tasks.map((task) => {
          console.log(task)
          return <TaskComponent key={task.id} task={task} />
        })}
      </CardContent>
      <CardActions>
        <TaskAction column={column} />
      </CardActions>
    </Card>
  )
}

export default ColumnComponent

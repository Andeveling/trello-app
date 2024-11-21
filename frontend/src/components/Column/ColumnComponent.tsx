import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Card, CardActions, CardContent, CardHeader } from "@mui/material"
import React from "react"
import { Column } from "../../types"
import TaskComponent from "../Task/TaskComponent"
import ColumnActions from "./ColumnActions"
import TaskFormModal from "../Task/TaskFormModal"
import { useModal } from "../../hooks/useModal"
import TaskAction from "../Task/TasckAction"

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
        {/* Contexto de ordenación de tareas dentro de la columna */}
        <SortableContext
          items={column.tasks.map((task) => task.id)} // Mapeamos las tareas por su ID
          strategy={verticalListSortingStrategy} // Estrategia para el ordenamiento vertical
        >
          {column.tasks.map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))}
        </SortableContext>
      </CardContent>
      <CardActions>
        <TaskAction />
      </CardActions>
    </Card>
  )
}

export default ColumnComponent

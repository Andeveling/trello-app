import React, { useState } from "react"
import { Grid2, Box, Paper, Stack } from "@mui/material"
import TaskCard from "./TaskCard"
import { TaskStatus } from "../types"

interface TaskListProps {
  taskListName: string
  tasks: {
    id: number
    title: string
    description: string
    status: TaskStatus
    assignedTo: { name: string } | null
  }[]
}

const TaskListContainer: React.FC<TaskListProps> = ({ taskListName, tasks }) => {
  const [taskList, setTaskList] = useState(tasks)

  // Manejo de arrastre
  const handleDragStart = (task: any) => {
    console.log("Arrastrando tarea:", task)
  }

  const handleDragEnd = () => {
    console.log("Fin del arrastre")
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const taskData = event.dataTransfer.getData("task")
    const task = JSON.parse(taskData)

    // Aquí puedes manejar la lógica para reorganizar el estado de las tareas
    console.log("Tarea soltada:", task)

    // Ejemplo de lógica de reordenamiento (simple por ahora)
    const updatedTasks = taskList.filter((t) => t.id !== task.id)
    updatedTasks.push(task)
    setTaskList(updatedTasks)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault() // Necesario para que el evento `onDrop` funcione
  }

  return (
    <Stack spacing={2} direction='row'>
      <Paper
        sx={{
          padding: 2,
          backgroundColor: "#e0e0e0",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        <h3>{taskListName}</h3>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {taskList.map((task) => (
            <TaskCard key={task.id} task={task} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />
          ))}
        </Box>
      </Paper>
    </Stack>
  )
}

export default TaskListContainer

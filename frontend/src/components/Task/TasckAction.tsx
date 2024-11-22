import { Box, Button } from "@mui/material"
import React from "react"
import { useModal } from "../../hooks/useModal"
import TaskFormModal from "./TaskFormModal"
import AddIcon from "@mui/icons-material/Add"
import { Column } from "../../types"
import { create } from "zustand"
import { useTaskMutation } from "../../hooks/useTaskMutation"

interface TaskActionProps {
  column: Column
}

const TaskAction: React.FC<TaskActionProps> = ({ column }) => {
  const { handleOpen, handleClose, open } = useModal()
  const { createTaskMutation } = useTaskMutation({ onClose: handleClose})

  const handleAddTask = (data: { title: string; description?: string }) => {
    const newTask = {
      title: data.title,
      description: data.description,
      columnId: column.id,
    }
    createTaskMutation.mutate(newTask)
  }

  return (
    <Box>
      <Button startIcon={<AddIcon />} variant='outlined' color='primary' onClick={handleOpen} fullWidth>
        Add Task
      </Button>
      <TaskFormModal open={open} onClose={handleClose} onSubmit={handleAddTask} />
    </Box>
  )
}

export default TaskAction

import { Box, Button } from "@mui/material"
import React from "react"
import { useModal } from "../../hooks/useModal"
import TaskFormModal from "./TaskFormModal"
import AddIcon from "@mui/icons-material/Add"

const TaskAction: React.FC = () => {
  const { handleOpen, handleClose, open } = useModal()

  const handleAddTask = (data: { title: string; description?: string }) => {
    console.log("New Task Data:", data)
    // Add logic to save the task (e.g., API call)
  }

  return (
    <Box>
          <Button
                startIcon={<AddIcon />}
              variant='outlined' color='primary' onClick={handleOpen} fullWidth>
        Add Task
      </Button>
      <TaskFormModal open={open} onClose={handleClose} onSubmit={handleAddTask} />
    </Box>
  )
}

export default TaskAction

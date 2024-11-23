import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import type React from "react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useMembersBoardQuery } from "../../hooks/useMembersBoardQuery"
import { assignedToTask } from "../../services/task.service"
import { useTaskMutation } from "../../hooks/useTaskMutation"

const TaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z.string().optional(),
})

type TaskFormData = z.infer<typeof TaskSchema>

interface TaskFormModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: TaskFormData) => void
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ open, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),

    defaultValues: {
      title: "",
      description: "",
    },
  })

  const handleFormSubmit = (data: TaskFormData) => {
    onSubmit(data)
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Title'
                fullWidth
                margin='normal'
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Description'
                fullWidth
                margin='normal'
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type='submit' onClick={handleSubmit(handleFormSubmit)} variant='contained'>
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskFormModal

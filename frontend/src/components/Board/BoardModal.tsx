import React from "react"
import { Modal, Box, TextField, Button, Typography, IconButton } from "@mui/material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import CloseIcon from "@mui/icons-material/Close"
import { api } from "../../api/api"
import { BoardFormData, BoardSchema } from "../../schemas/board.schema"
import { useAuthStore } from "../../stores/auth.store"

interface ProjectModalProps {
  open: boolean
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardFormData>({
    resolver: zodResolver(BoardSchema),
  })

  const user = useAuthStore((state) => state.user)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: BoardFormData) => {
      const response = await api.post("/boards", {
        name: data.name,
        description: data.description,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      })
      onClose()
    },
    onError: (error: any) => {
      console.error("Error in creating board:", error)
    },
  })

  const onSubmit = (data: BoardFormData) => {
    mutation.mutate(data)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          width: 400,
          boxShadow: 24,
        }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}>
          <CloseIcon />
        </IconButton>

        <Typography variant='h6' gutterBottom>
          Create Board
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label='Board Name'
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin='normal'
          />

          <TextField
            fullWidth
            label='Board Description'
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            margin='normal'
            multiline
            rows={4}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button variant='outlined' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit' disabled={mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create Board"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default ProjectModal

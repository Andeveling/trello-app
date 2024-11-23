import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@mui/material"
import type React from "react"
import type { Task, User } from "../../types"
import AssignAvatarButton from "./AssignAvatarButton"
import { useParams } from "react-router-dom"
import { useMembersBoardQuery } from "../../hooks/useMembersBoardQuery"
import { useTaskMutation } from "../../hooks/useTaskMutation"
import { useQueryTaskById } from "../../hooks/useQueryTaskById"

interface TaskModalProps {
  task: Task
  open: boolean
  onClose: () => void
}

const TaskModal: React.FC<TaskModalProps> = ({ task, open, onClose }) => {
  const { boardId } = useParams()
  const { data: members, isLoading: isMembersLoading } = useMembersBoardQuery(Number(boardId))
  const { assignedToTaskMutation } = useTaskMutation({ onClose })
  const { data, isLoading, isError, error } = useQueryTaskById(task.id)

  // Verificaciones de carga y error
  if (isLoading) return <Typography>Cargando...</Typography>
  if (isError) return <Typography>Error: {error?.message}</Typography>

  const handleAssign = (user: User) => {
    assignedToTaskMutation.mutate({ taskId: task.id, userId: user.id })
  }

  const availableUsers = members ? members.map((m) => m.user) : []

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='lg'>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h3'>{data?.title}</Typography>
          <AssignAvatarButton assignedUser={task.assignedTo} availableUsers={availableUsers} onAssign={handleAssign} />
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant='body1' gutterBottom>
          <strong>Descripción:</strong> {data?.description}
        </Typography>

        {/* Mostrar el usuario asignado */}
        {data?.assignedTo && (
          <List>
            <ListItem>
              <Avatar>{data.assignedTo?.name?.charAt(0)}</Avatar>
              <Typography variant='body1'>{data?.assignedTo.name}</Typography>
            </ListItem>
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskModal

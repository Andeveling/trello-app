import type React from "react"
import { useState } from "react"
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import type { User } from "../../types"

interface AssignAvatarButtonProps {
  assignedUser?: User | null
  availableUsers: User[]
  onAssign: (user: User) => void
}

const AssignAvatarButton: React.FC<AssignAvatarButtonProps> = ({ assignedUser, availableUsers, onAssign }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleAssign = (user: User) => {
    onAssign(user)
    handleCloseMenu()
  }

  const getInitials = (name?: string | null): string => {
    if (!name) return "?"
    const parts = name.split(" ")
    return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0]
  }

  return (
    <>
      <Tooltip title={assignedUser ? `Asignado a: ${assignedUser.name || assignedUser.email}` : "Asignar usuario"}>
        <IconButton onClick={handleOpenMenu} color='info' size='small'>
          {assignedUser ? (
            <Avatar variant='circular'>{getInitials(assignedUser.name)}</Avatar>
          ) : (
            <Avatar>
              <AddCircleOutlineIcon />
            </Avatar>
          )}
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {availableUsers.map((user) => (
          <MenuItem
            key={user.id}
            onClick={() => handleAssign(user)}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant='body2'>{user.name} - {user.email}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default AssignAvatarButton

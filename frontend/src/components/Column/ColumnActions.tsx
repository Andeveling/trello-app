import React, { useState } from "react"
import { IconButton, Menu, MenuItem } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Column } from "../../types"

export const ColumnActions = ({ column }: { column: Column }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-label='column actions'
        aria-controls={open ? "column-actions-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='column-actions-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "column-actions-button",
        }}>
        <MenuItem onClick={handleClose}>Edit Column</MenuItem>
        <MenuItem onClick={handleClose}>Delete Column</MenuItem>
      </Menu>
    </>
  )
}

export default ColumnActions

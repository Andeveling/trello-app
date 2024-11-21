import { Button } from "@mui/material"
import { useModal } from "../../hooks/useModal"
import BoardModal from "./BoardModal"

export default function CreateProjectModal() {
  const { open, handleOpen, handleClose } = useModal()
  return (
    <>
      <Button size='small' variant='outlined' color='primary' onClick={handleOpen}>
        Add Board
      </Button>
      <BoardModal open={open} onClose={handleClose} />
    </>
  )
}

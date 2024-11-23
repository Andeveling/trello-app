import { Avatar, AvatarGroup, Button, Card, CardContent, CardHeader, Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import ColumnFormModal from "../../components/Column/CreateColumnModal"
import { useBoardQuery } from "../../hooks/useBoardQuery"
import { useModal } from "../../hooks/useModal"
import Board from "../../components/Board/Board"
import { useMembersBoardQuery } from "../../hooks/useMembersBoardQuery"

export default function BoardPage() {
  const { open, handleOpen, handleClose } = useModal()
  const { boardId } = useParams()
  const { data: board, isLoading, isError, error } = useBoardQuery(Number(boardId))
  const { data: members } = useMembersBoardQuery(Number(boardId))

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <>
      <Card variant='outlined' sx={{ height: "100%", width: "100%" }}>
        <CardHeader
          title={board?.name}
          subheader={board?.description}
          action={
            <AvatarGroup max={3} sx={{ marginLeft: "auto" }}>
              {members.map((member) => (
                <Avatar key={member.id}>{member?.user.name?.[0]}</Avatar>
              ))}
            </AvatarGroup>
          }
        />
        <CardContent>
          <Stack direction={"column"} spacing={1}>
            <Stack direction={"row"} spacing={1}>
              <Button variant='outlined' color='primary' onClick={handleOpen}>
                Create Column
              </Button>
            </Stack>
            <Board />
          </Stack>
        </CardContent>
      </Card>
      <ColumnFormModal open={open} handleClose={handleClose} />
    </>
  )
}

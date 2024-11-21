import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material"
import Board from "../../components/Board/Board"
import ColumnFormModal from "../../components/Column/CreateColumnModal"
import { useModal } from "../../hooks/useModal"
import { Route } from "../../routes/__auth..boards.$boardId"

export default function BoardPage() {
  const { board } = Route.useLoaderData()
  const { open, handleOpen, handleClose } = useModal()

  console.log(board)

  return (
    <>
      <Card variant='outlined' sx={{ height: "100%", width: "100%" }}>
        <CardHeader title={board.name} subheader={board.description} />
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

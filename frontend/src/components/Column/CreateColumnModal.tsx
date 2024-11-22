import { zodResolver } from "@hookform/resolvers/zod"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import React, { Fragment } from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { ColumnFormData, ColumnSchema } from "../../schemas/column.schema"
import { useColumnMutation } from "../../hooks/useColumnMutation"
import { TaskStatus } from "../../types"
import { useParams } from "react-router-dom"

interface ColumnFormProps {
  open: boolean
  handleClose: () => void
}

const ColumnFormModal: React.FC<ColumnFormProps> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ColumnFormData>({
    resolver: zodResolver(ColumnSchema),
    defaultValues: {
      status: TaskStatus.TODO,
    },
  })

  const { boardId } = useParams()

  const mutateColumn = useColumnMutation({ onClose: handleClose })

  const onSubmit: SubmitHandler<ColumnFormData> = (data) => {
    mutateColumn.mutate(data)
    reset()
  }

  const onErrors: SubmitErrorHandler<ColumnFormData> = (errors) => {
    console.log(errors)
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='Create Column'
        aria-describedby='alert-dialog-description'
        maxWidth='sm'
        fullWidth>
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <DialogTitle id='alert-dialog-title'> Create Column</DialogTitle>
          <DialogContent>
            <Box sx={{ marginTop: 2 }}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => <TextField {...field} label='Column Name' fullWidth error={!!errors.name} />}
              />
              {errors.name && <FormHelperText>{errors.name?.message}</FormHelperText>}
            </Box>

            <Box sx={{ marginTop: 2 }}>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Status base</InputLabel>
                    <Select {...field} label='Status base' value={field.value}>
                      <MenuItem value={TaskStatus.TODO}>TODO</MenuItem>
                      <MenuItem value={TaskStatus.IN_PROGRESS}>IN_PROGRESS</MenuItem>
                      <MenuItem value={TaskStatus.DONE}>DONE</MenuItem>
                    </Select>
                    <FormHelperText>{errors.status?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Box>

            <input type='hidden' value={boardId} {...register("boardId")} />
          </DialogContent>

          <DialogActions>
            <Button variant='outlined' type='button' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' type='submit'>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default ColumnFormModal

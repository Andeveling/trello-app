import { z } from "zod"
import { TaskStatus } from "../types"

export const ColumnSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name can't be more than 255 characters"),
  status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE]).default(TaskStatus.TODO),
  boardId: z.coerce.number().min(1, "Board ID is required"),
})

export type ColumnFormData = z.infer<typeof ColumnSchema>

import { z } from "zod"

export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title can't exceed 255 characters"),
  description: z.string().optional(),
  columnId: z.coerce.number().min(1, "Column ID is required"),
  assignedToId: z.coerce.number().optional(), 
})

export type TaskFormData = z.infer<typeof TaskSchema>

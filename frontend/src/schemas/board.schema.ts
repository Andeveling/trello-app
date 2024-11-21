import { z } from "zod"

export const BoardSchema = z.object({
  name: z.string().min(1).max(100).max(100),
  description: z.string().max(500).nullable(),
})

export type BoardFormData = z.infer<typeof BoardSchema>

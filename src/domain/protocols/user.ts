import z from 'zod'

export const UserSchema = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  email: z.string().email().nullable(),
  name: z.string().optional(),
  password: z.string().optional().nullable(),
  confirmPassword: z.string().optional()
})

export type User = z.infer<typeof UserSchema>

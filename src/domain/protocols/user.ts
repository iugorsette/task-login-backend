import z from 'zod'

export const UserSchema = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  email: z.string().email({ message: 'Favor inserir um email válido' }).nonempty().nullable(),
  name: z.string().nonempty().optional(),
  password: z.string().nullable(),
  confirmPassword: z.string().optional()
})

export type User = z.infer<typeof UserSchema>

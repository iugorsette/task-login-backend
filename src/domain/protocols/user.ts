import z from 'zod'

const passwordSchema = z
  .string()
  .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  .refine((value) => /[A-Z]/.test(value), {
    message: 'A senha deve conter pelo menos uma letra maiúscula.'
  })
  .refine((value) => /[a-z]/.test(value), {
    message: 'A senha deve conter pelo menos uma letra minúscula.'
  })
  .refine((value) => /[0-9]/.test(value), {
    message: 'A senha deve conter pelo menos um número.'
  })

export const UserSchema = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  email: z
    .string()
    .email({ message: 'Favor inserir um email válido' })
    .nonempty()
    .nullable(),
  name: z
    .string()
    .nonempty({ message: 'Favor informar o seu nome' })
    .optional(),
  password: passwordSchema,
  confirmPassword: z.string().optional()
})

export type User = z.infer<typeof UserSchema>

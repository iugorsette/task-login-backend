import z from 'zod'

export const TaskSchema = z.object({
  _id: z.string().optional(),
  title: z.string().nonempty({ message: 'Favor informar o título da tarefa' }),
  description: z.string().nonempty({ message: 'Favor informar a descrição da tarefa' }),
  status: z.enum(['active', 'pending', 'finished']),
  userId: z.string().nonempty({ message: 'Favor informar o id do usuário' })
})

export type Task = z.infer<typeof TaskSchema>

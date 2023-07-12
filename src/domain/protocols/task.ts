import z from 'zod'

export const TaskSchema = z.object({
  _id: z.any().optional(),
  title: z.string().nonempty({ message: 'Favor informar o título da tarefa' }),
  description: z.string().nonempty({ message: 'Favor informar a descrição da tarefa' }),
  status: z.enum(['active', 'pending', 'finished'], { description: 'Favor informar o status da tarefa :active, pending, finished' }),
  userId: z.string().nonempty({ message: 'Favor informar o id do usuário' }),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
})

export type Task = z.infer<typeof TaskSchema>

import 'dotenv/config'
import { z } from 'zod'

const enviromentsSchema = z.object({
  APP_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  APP_PORT: z.string().default('3000'),
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default('12345'),
  DB_NAME: z.string(),
  JWT_SECRET: z.string()
})

const _env = enviromentsSchema.safeParse(process.env)

if (!_env.success) {
  console.log('-->', _env)
  throw new Error('Invalid environment variables')
}

export const env = _env.data

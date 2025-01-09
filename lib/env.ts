import { z } from 'zod'

const envSchema = z.object({
  TOGETHER_API_KEY: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

// Validate environment variables at startup
try {
  envSchema.parse(process.env)
} catch (error) {
  console.error(
    'Invalid environment variables:',
    error instanceof z.ZodError ? error.errors : error
  )
  process.exit(1)
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}


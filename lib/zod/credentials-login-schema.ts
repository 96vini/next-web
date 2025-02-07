import * as z from 'zod'

export const credentialsLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
})

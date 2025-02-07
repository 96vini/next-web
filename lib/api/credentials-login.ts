import { api } from '@/lib/axios'
import { User } from 'next-auth'

export type CredentialsLoginInput = Partial<Record<"email" | "password", unknown>>

export const credentialsLogin = async ({ email, password}: CredentialsLoginInput): Promise<User | undefined> => {
  const response = await api.post('/login', { email, password })
  return response.data
}

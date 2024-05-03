'use server'

import { signIn } from '@/auth'
import { schemaSignin } from '@/lib/schema'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

export const addUser = async (state: any, formData: FormData) => {
  const verification = schemaSignin.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (verification.success) {
    const { email, password } = verification.data
    const defaultEmail = 'johnDoe@company.com'
    const defaultPassword = '123456'

    if (defaultEmail !== email && defaultPassword !== password)
      return { _error: 'User does not exist!' }

    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT
      })

      return { _succes: 'Sign in successful!' }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { _error: 'invalid credentials' }
          default:
            return { _error: 'something went wrong!' }
        }
      }
      throw error
    }
  }

  if (!verification.success) {
    return { error: verification.error.format() }
  }
}

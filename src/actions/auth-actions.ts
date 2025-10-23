'use server'

import { signIn, signOut } from '@/auth/auth'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { createUser, getUserByEmail } from '@/repositories/user-repository'
import { AuthError } from 'next-auth'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function authenticate(formData: FormData) {
  try {
    const parsed = signInSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (!parsed.success) {
      return { error: parsed.error.issues[0].message }
    }

    await signIn('credentials', {
      ...parsed.data,
      redirectTo: '/dashboard',
    })

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}

export async function signUpAction(formData: FormData) {
  try {
    const parsed = signUpSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (!parsed.success) {
      return { error: parsed.error.issues[0].message }
    }

    const { name, email, password } = parsed.data

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return { error: 'Email already in use' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    await createUser({
      name,
      email,
      password: hashedPassword,
      role: 'CUSTOMER',
    })

    // Auto sign in after signup
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    })

    return { success: true }
  } catch (error) {
    console.error('Sign up error:', error)
    return { error: 'Failed to create account' }
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/auth/signin' })
}

export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/dashboard' })
}

export async function signInWithGitHub() {
  await signIn('github', { redirectTo: '/dashboard' })
}

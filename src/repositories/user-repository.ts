import { prisma } from '@/lib/prisma'
import type { User, UserRole } from '@prisma/client'

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { email },
    })
  } catch (error) {
    console.error('Error fetching user by email:', error)
    return null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error('Error fetching user by id:', error)
    return null
  }
}

export async function createUser(data: {
  email: string
  name?: string
  password?: string
  role?: UserRole
}): Promise<User> {
  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role || 'CUSTOMER',
    },
  })
}

export async function updateUser(
  id: string,
  data: Partial<Pick<User, 'name' | 'email' | 'image' | 'role'>>
): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data,
  })
}

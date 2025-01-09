'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function uploadImage(data: FormData) {
  const file = data.get('file') as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Save to public directory
  const path = join('public', 'workflows', file.name)
  await writeFile(path, buffer)
  
  return `/workflows/${file.name}`
}


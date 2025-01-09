'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { uploadImage } from '@/lib/upload-image'

export function ImageUpload() {
  const [uploading, setUploading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setUploading(true)

    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      const path = await uploadImage(formData)
      console.log('Image uploaded:', path)
    } catch (error) {
      console.error('Error uploading:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <input
          type="file"
          name="file"
          accept="image/*"
          className="cursor-pointer"
        />
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Workflow Image'}
        </Button>
      </div>
    </form>
  )
}


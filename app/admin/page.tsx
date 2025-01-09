import { ImageUpload } from '@/components/image-upload'

export default function AdminPage() {
  return (
    <div className="container py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-mono">Upload Workflow Images</h1>
        <ImageUpload />
      </div>
    </div>
  )
}


'use client'
import { updateSection } from '@/lib/cms'

export default function EditToolbar({ section }: any) {
  async function handleEdit() {
    const newTitle = prompt('Enter new title:', section.content.title)
    if (newTitle) {
      await updateSection(section.id, {
        ...section.content,
        title: newTitle,
      })
      window.location.reload()
    }
  }

  return (
    <div className="absolute top-2 right-2 bg-white shadow-lg px-3 py-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded flex gap-2 border border-gray-200">
      <button
        onClick={handleEdit}
        className="hover:text-green-600 font-medium"
      >
        ✏️ Edit
      </button>
      <button className="hover:text-blue-600">
        ↑↓ Move
      </button>
      <button className="hover:text-red-600">
        🗑 Delete
      </button>
    </div>
  )
}

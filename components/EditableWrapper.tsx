'use client'
import { useEffect, useState } from 'react'
import EditToolbar from './admin/EditToolbar'

export default function EditableWrapper({
  children,
  section,
  enabled,
}: any) {
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    if (enabled && section?.type === 'products') {
      // Simulate analytics - in production, fetch from database
      setAnalytics({ views: 1234, clicks: 89 })
    }
  }, [enabled, section?.type])

  // If not enabled (public mode), just return children without wrapper
  if (!enabled) {
    return <>{children}</>
  }

  return (
    <div className="relative group border-2 border-dashed border-green-500 hover:border-green-600 transition-all">
      <EditToolbar section={section} />
      
      {/* Analytics badge for products */}
      {analytics && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          👁 {analytics.views} views · 🖱 {analytics.clicks} clicks
        </div>
      )}
      
      {children}
    </div>
  )
}

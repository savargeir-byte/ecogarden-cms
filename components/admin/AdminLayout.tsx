'use client'

import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    {
      group: 'Content',
      items: [
        { name: 'Pages', href: '/admin', icon: '📄' },
        { name: 'Products', href: '/admin/products', icon: '🛍️' },
        { name: 'Images & Banners', href: '/admin/images', icon: '🖼️' },
        { name: 'Announcements', href: '/admin/announcements', icon: '🔔' },
      ]
    },
    {
      group: 'Settings',
      items: [
        { name: 'Users', href: '/admin/users', icon: '👥' },
        { name: 'Analytics', href: '/admin/analytics', icon: '📊' },
        { name: 'Audit Log', href: '/admin/audit', icon: '📋' },
      ]
    },
    {
      group: 'Deploy',
      items: [
        { name: 'Deployment', href: '/admin/deploy', icon: '🚀' },
      ]
    }
  ];

  const filteredItems = menuItems.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-2xl">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-xl font-bold">
              🌱
            </div>
            <div>
              <div className="font-bold text-xl">EcoGarden</div>
              <div className="text-xs text-gray-400">Content Management</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {filteredItems.map((group, idx) => (
            <div key={idx} className="mb-6">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                {group.group}
              </div>
              <div className="space-y-1">
                {group.items.map((item, itemIdx) => (
                  <a
                    key={itemIdx}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                        : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-gray-400">Super Admin</div>
            </div>
            <button className="text-gray-400 hover:text-white text-xl">⚙️</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}

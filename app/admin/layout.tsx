'use client';

import Link from "next/link";
import RoleGate from "@/components/RoleGate";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Pages", icon: "📄" },
    { href: "/admin/products", label: "Products", icon: "🛍️" },
    { href: "/admin/media", label: "Media", icon: "🖼️" },
    { href: "/admin/stats", label: "Analytics", icon: "📊" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/admin" className="text-xl font-bold text-gray-900">
            EcoGarden CMS
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href="/" 
            target="_blank"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View site →
          </a>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">
            ⚙️
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Overlay (mobile) */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 top-[57px] z-40
            w-64 bg-white border-r border-gray-200 p-4
            transform transition-transform duration-300
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                  ${pathname === item.href 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            <RoleGate role="admin">
              <Link
                href="/admin/users"
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                  ${pathname === '/admin/users' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-lg">👥</span>
                Users
                <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                  Admin
                </span>
              </Link>
            </RoleGate>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

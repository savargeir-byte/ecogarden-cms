'use client';

import Link from "next/link";
import RoleGate from "@/components/RoleGate";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        setUserEmail(data.user.email || null);
        
        // Get user role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
        
        setUserRole(profile?.role || null);
      }
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
  }

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
          
          {/* User Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {userEmail?.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-medium text-gray-900 max-w-[150px] truncate">
                  {userEmail || 'Loading...'}
                </div>
                {userRole && (
                  <div className="text-xs text-gray-500 capitalize">{userRole}</div>
                )}
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="text-xs text-gray-500">Signed in as</div>
                <div className="text-sm font-medium text-gray-900 truncate">{userEmail}</div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
              >
                <span>🚪</span>
                Sign out
              </button>
            </div>
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Truck,
  Wrench,
  Shield,
  BarChart3,
} from 'lucide-react';

import { useState } from 'react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getMenuItems = () => {
    const baseItems = [
      { path: '/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم', roles: ['manager', 'driver', 'firefighter', 'guard'] },
    ];

    const roleBasedItems = [
      { path: '/shifts', icon: Calendar, label: 'جدولة الورديات', roles: ['manager'] },
      { path: '/assignments', icon: Users, label: 'تعيين الفرق', roles: ['manager'] },
      { path: '/vehicles', icon: Truck, label: 'فحص العربات', roles: ['manager', 'driver', 'firefighter'] },
      { path: '/guards', icon: Shield, label: 'إدارة الحراسة', roles: ['manager', 'guard'] },
      { path: '/maintenance', icon: Wrench, label: 'تذاكر الصيانة', roles: ['manager', 'driver', 'firefighter'] },
      { path: '/reports', icon: BarChart3, label: 'التقارير والتحليلات', roles: ['manager'] },
    ];

    return [...baseItems, ...roleBasedItems].filter(item => 
      item.roles.includes(user?.role || '')
    );
  };

  const menuItems = getMenuItems();
  const [open, setOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Helper to close sidebar on mobile after navigation
  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) setOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile drawer */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar for desktop & drawer for mobile */}
      <aside
        className={
          `fixed z-50 top-0 right-0 md:static md:translate-x-0 transition-transform duration-300 bg-white border-l border-gray-200 shadow-lg flex flex-col h-screen md:h-[100dvh] w-64
          ${open ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:fixed md:top-0 md:right-0`
        }
        style={{height: '100dvh'}}
      >
        {/* Drawer toggle button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-blue-600 text-2xl"
            aria-label="إغلاق القائمة"
          >
            ×
          </button>
        </div>
        {/* Logo and title */}
        <div className="flex flex-col items-center py-6 border-b border-gray-100 mb-4">
          <div className="text-4xl mb-2 select-none text-blue-600">🚒</div>
          <div className="text-xl font-extrabold text-gray-900 mb-1">القائمة الرئيسية</div>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => handleNavigate(item.path)}
              className={
                `w-full text-right flex items-center gap-4 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-150 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-50 hover:text-blue-700 ` +
                (window.location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-md border-blue-500 scale-[1.03]'
                  : 'text-gray-800')
              }
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-100">
                <item.icon className="w-6 h-6 text-blue-500" />
              </span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto py-6 text-xs text-gray-400 text-center select-none border-t border-gray-100">
          &copy; {new Date().getFullYear()} Fire Admin
        </div>
      </aside>

      {/* Floating open button for mobile */}
      {isMobile && !open && (
        <button
          className="fixed z-50 bottom-6 right-6 bg-blue-600 text-white rounded-full shadow-lg p-4 md:hidden"
          onClick={() => setOpen(true)}
          aria-label="فتح القائمة"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      )}

      {/* Bottom nav for mobile */}
      {isMobile && (
        <nav className="fixed z-40 bottom-0 right-0 left-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 md:hidden shadow-lg">
          {menuItems.slice(0, 4).map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => handleNavigate(item.path)}
              className={
                `flex flex-col items-center justify-center px-2 py-1 rounded transition-all duration-150 focus:outline-none ` +
                (window.location.pathname === item.path
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-blue-700')
              }
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </>
  );
};

export default Sidebar;
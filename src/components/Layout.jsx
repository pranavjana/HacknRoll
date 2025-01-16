import { NavLink, Outlet } from 'react-router-dom';
import { HomeIcon, ClipboardIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-neutral-800 mb-8">PETRACK</h1>
          <nav className="space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`
              }
            >
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`
              }
            >
              <ClipboardIcon className="w-5 h-5" />
              <span>Tasks</span>
            </NavLink>
            <NavLink
              to="/pet"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`
              }
            >
              <HeartIcon className="w-5 h-5" />
              <span>Pet</span>
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
} 
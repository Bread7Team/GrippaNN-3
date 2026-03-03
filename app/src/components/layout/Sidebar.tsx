import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Building2, 
  GitBranch, 
  Briefcase, 
  Users, 
  ClipboardList, 
  History, 
  UserCog,
  LogOut
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/organizations', label: 'Организации', icon: Building2 },
  { to: '/departments', label: 'Отделы', icon: GitBranch },
  { to: '/positions', label: 'Должности', icon: Briefcase },
  { to: '/employees', label: 'Сотрудники', icon: Users },
  { to: '/hr-operations', label: 'Кадровые операции', icon: ClipboardList },
  { to: '/history', label: 'История изменений', icon: History },
];

const adminItems = [
  { to: '/users', label: 'Пользователи', icon: UserCog },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col">
      <div className="mb-8 px-3">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">GN</div>
          GrippaNN-3
        </h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Система управления персоналом</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <>
            <div className="px-3 pt-6 pb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Администрирование</p>
            </div>
            {adminItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="border-t border-gray-100 pt-4 mt-auto">
        <div className="px-3 py-2 bg-gray-50 rounded-lg mb-3">
          <p className="text-sm font-semibold text-gray-900 leading-none mb-1">
            {user?.last_name} {user?.first_name}
          </p>
          <p className="text-[10px] text-gray-500 font-medium">
            {user?.role === 'admin' ? 'Администратор' : 'Менеджер по персоналу'}
          </p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Выйти
        </button>
      </div>
    </aside>
  );
}

import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/organizations', label: 'Организации' },
  { to: '/departments', label: 'Отделы' },
  { to: '/positions', label: 'Должности' },
  { to: '/employees', label: 'Сотрудники' },
  { to: '/hr-operations', label: 'Кадровые операции' },
  { to: '/history', label: 'История изменений' },
];

const adminItems = [
  { to: '/users', label: 'Пользователи' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800">HRM-система</h1>
        <p className="text-sm text-gray-500 mt-1">Учёт сотрудников</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <>
            <div className="border-t border-gray-200 my-3" />
            {adminItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600 mb-1">
          {user?.last_name} {user?.first_name}
        </p>
        <p className="text-xs text-gray-400 mb-3">
          {user?.role === 'admin' ? 'Администратор' : 'Менеджер по персоналу'}
        </p>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Выйти
        </button>
      </div>
    </aside>
  );
}

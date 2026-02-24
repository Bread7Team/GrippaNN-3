import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Главная</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Добро пожаловать, <strong>{user?.last_name} {user?.first_name}</strong>!
        </p>
        <p className="text-gray-500 mt-2">
          Роль: {user?.role === 'admin' ? 'Администратор' : 'Менеджер по персоналу'}
        </p>
      </div>
    </div>
  );
}

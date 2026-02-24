import { useState, useEffect } from 'react';
import { employeesApi } from '@/api/employees';
import { filesApi } from '@/api/files';
import type { Employee, FileItem } from '@/types';

export default function EmployeesPage() {
  const [items, setItems] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [showDetail, setShowDetail] = useState<Employee | null>(null);
  const [empFiles, setEmpFiles] = useState<FileItem[]>([]);
  const [form, setForm] = useState({
    last_name: '', first_name: '', middle_name: '', birth_date: '',
    passport_series: '', passport_number: '', passport_issue_date: '',
    passport_issued_by: '', passport_code: '',
    address_region: '', address_city: '', address_street: '',
    address_house: '', address_building: '', address_flat: '',
  });
  const [fileTitle, setFileTitle] = useState('');
  const [fileInput, setFileInput] = useState<File | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await employeesApi.list();
      setItems(data.results);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const loadFiles = async (empId: number) => {
    const { data } = await filesApi.list({ employee: String(empId) });
    setEmpFiles(data.results);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, birth_date: form.birth_date || null, passport_issue_date: form.passport_issue_date || null };
    if (editing) {
      await employeesApi.update(editing.id, payload);
    } else {
      await employeesApi.create(payload);
    }
    setShowForm(false);
    setEditing(null);
    resetForm();
    load();
  };

  const resetForm = () => setForm({
    last_name: '', first_name: '', middle_name: '', birth_date: '',
    passport_series: '', passport_number: '', passport_issue_date: '',
    passport_issued_by: '', passport_code: '',
    address_region: '', address_city: '', address_street: '',
    address_house: '', address_building: '', address_flat: '',
  });

  const handleEdit = (item: Employee) => {
    setEditing(item);
    setForm({
      last_name: item.last_name, first_name: item.first_name, middle_name: item.middle_name,
      birth_date: item.birth_date || '',
      passport_series: item.passport_series, passport_number: item.passport_number,
      passport_issue_date: item.passport_issue_date || '',
      passport_issued_by: item.passport_issued_by, passport_code: item.passport_code,
      address_region: item.address_region, address_city: item.address_city,
      address_street: item.address_street, address_house: item.address_house,
      address_building: item.address_building, address_flat: item.address_flat,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Удалить сотрудника?')) {
      await employeesApi.delete(id);
      load();
    }
  };

  const handleFileUpload = async (empId: number) => {
    if (!fileInput || !fileTitle) return;
    await filesApi.upload(empId, fileTitle, fileInput);
    setFileTitle('');
    setFileInput(null);
    loadFiles(empId);
  };

  const handleViewDetail = (item: Employee) => {
    setShowDetail(item);
    loadFiles(item.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Сотрудники</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); resetForm(); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Добавить</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">{editing ? 'Редактировать' : 'Новый сотрудник'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия *</label>
              <input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
              <input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Отчество</label>
              <input value={form.middle_name} onChange={(e) => setForm({ ...form, middle_name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Дата рождения</label>
              <input type="date" value={form.birth_date} onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Серия паспорта</label>
              <input value={form.passport_series} onChange={(e) => setForm({ ...form, passport_series: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Номер паспорта</label>
              <input value={form.passport_number} onChange={(e) => setForm({ ...form, passport_number: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Дата выдачи</label>
              <input type="date" value={form.passport_issue_date} onChange={(e) => setForm({ ...form, passport_issue_date: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Кем выдан</label>
              <input value={form.passport_issued_by} onChange={(e) => setForm({ ...form, passport_issued_by: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Код подразделения</label>
              <input value={form.passport_code} onChange={(e) => setForm({ ...form, passport_code: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Область</label>
              <input value={form.address_region} onChange={(e) => setForm({ ...form, address_region: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Населённый пункт</label>
              <input value={form.address_city} onChange={(e) => setForm({ ...form, address_city: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Улица</label>
              <input value={form.address_street} onChange={(e) => setForm({ ...form, address_street: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Дом</label>
              <input value={form.address_house} onChange={(e) => setForm({ ...form, address_house: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Корпус</label>
              <input value={form.address_building} onChange={(e) => setForm({ ...form, address_building: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Квартира</label>
              <input value={form.address_flat} onChange={(e) => setForm({ ...form, address_flat: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="col-span-3 flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Сохранить</button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300">Отмена</button>
            </div>
          </form>
        </div>
      )}

      {showDetail && (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">{showDetail.full_name}</h2>
            <button onClick={() => setShowDetail(null)} className="text-gray-400 hover:text-gray-600">Закрыть</button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <p><strong>Дата рождения:</strong> {showDetail.birth_date || '—'}</p>
            <p><strong>Паспорт:</strong> {showDetail.passport_series} {showDetail.passport_number}</p>
            <p><strong>Адрес:</strong> {[showDetail.address_region, showDetail.address_city, showDetail.address_street, showDetail.address_house].filter(Boolean).join(', ') || '—'}</p>
          </div>
          <h3 className="font-semibold text-sm mb-2">Файлы</h3>
          <div className="space-y-1 mb-3">
            {empFiles.map((f) => (
              <div key={f.id} className="flex items-center gap-2 text-sm">
                <a href={f.file} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{f.title}</a>
                <button onClick={async () => { await filesApi.delete(f.id); loadFiles(showDetail.id); }}
                  className="text-red-500 text-xs">Удалить</button>
              </div>
            ))}
            {empFiles.length === 0 && <p className="text-gray-400 text-sm">Нет файлов</p>}
          </div>
          <div className="flex gap-2 items-end">
            <input placeholder="Название файла" value={fileTitle} onChange={(e) => setFileTitle(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1" />
            <input type="file" onChange={(e) => setFileInput(e.target.files?.[0] || null)} className="text-sm" />
            <button onClick={() => handleFileUpload(showDetail.id)}
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">Загрузить</button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ФИО</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Дата рождения</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{item.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{item.full_name}</td>
                  <td className="px-4 py-3 text-gray-500">{item.birth_date || '—'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleViewDetail(item)} className="text-green-600 hover:text-green-800 text-sm">Просмотр</button>
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 text-sm">Изменить</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 text-sm">Удалить</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">Нет данных</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

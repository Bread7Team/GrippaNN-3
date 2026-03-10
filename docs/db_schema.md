# Схема базы данных HRM-системы

## Таблицы и связи

### 1. Пользователи и Доступ
- **users** (`User`): Системные пользователи (admin, hr_manager).

### 2. Организационная структура
- **organizations** (`Organization`): Юридические лица.
- **departments** (`Department`): Отделы. Связи: `organization_id`, `parent_id` (рекурсия).
- **positions** (`Position`): Должности.

### 3. Персонал
- **employees** (`Employee`): Личные данные сотрудников.
- **files** (`File`): Сканы документов. Связь: `employee_id`.

### 4. Движение персонала и Аудит
- **hr_operations** (`HrOperation`): Найм, переводы, увольнения. Связи: `employee_id`, `department_id`, `position_id`.
- **change_history** (`ChangeHistory`): Лог всех изменений в системе.

## Особенности
- **Soft Delete**: Все основные таблицы имеют поле `deleted_at`.
- **Audit Log**: Любое действие через API логируется в `change_history`.

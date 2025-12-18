# Telegram Chat - Тестовое задание

Однопользовательский чат в стиле Telegram с сохранением истории сообщений.

## Структура проекта

- `backend/` - FastAPI бекенд
- `frontend/` - React + TypeScript фронтенд
- `PLAN.md` - План выполнения задания
- `REVIEW.md` - Саморевью и ретроспектива

## Локальный запуск

### Бекенд

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Бекенд будет доступен по адресу: http://localhost:8000

### Фронтенд

```bash
cd frontend
npm install
npm run dev
```

Фронтенд будет доступен по адресу: http://localhost:3000

## API

### GET /messages
Получить все сообщения

### POST /messages
Отправить новое сообщение

```json
{
  "text": "Текст сообщения",
  "sender": "user"
}
```

## Деплой

Подробные инструкции по деплою находятся в файле [DEPLOY.md](./DEPLOY.md)

Если возникли проблемы с 404 ошибками, см. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

Рекомендуемые платформы:
- **Бекенд**: Railway или Render
- **Фронтенд**: Vercel или Netlify

После деплоя обновите переменную окружения `VITE_API_URL` на фронтенде, указав URL вашего бекенда.

## Технологии

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Python 3.11, FastAPI, Uvicorn
- **Хранение данных**: In-memory (можно расширить до БД)

## Структура проекта

```
.
├── backend/           # FastAPI бекенд
│   ├── main.py       # Основной файл API
│   └── requirements.txt
├── frontend/         # React фронтенд
│   ├── src/
│   │   ├── components/
│   │   ├── api.ts
│   │   └── types.ts
│   └── package.json
├── PLAN.md          # План выполнения
├── REVIEW.md        # Саморевью и ретроспектива
└── DEPLOY.md        # Инструкции по деплою
```


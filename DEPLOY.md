# Инструкции по деплою

## Деплой бекенда

### Вариант 1: Railway

1. Создайте аккаунт на [Railway](https://railway.app)
2. Создайте новый проект
3. Подключите репозиторий или загрузите код из папки `backend`
4. Railway автоматически определит Python проект
5. Убедитесь, что в настройках указан правильный start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. После деплоя скопируйте URL вашего API

### Вариант 2: Render

1. Создайте аккаунт на [Render](https://render.com)
2. Создайте новый Web Service
3. Подключите репозиторий или загрузите код из папки `backend`
4. Настройки:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. После деплоя скопируйте URL вашего API

## Деплой фронтенда

### Вариант 1: Vercel

1. Создайте аккаунт на [Vercel](https://vercel.com)
2. Импортируйте проект из папки `frontend`
3. В настройках Environment Variables добавьте:
   - `VITE_API_URL` = URL вашего бекенда (например, `https://your-backend.railway.app`)
4. Деплой произойдет автоматически

### Вариант 2: Netlify

1. Создайте аккаунт на [Netlify](https://netlify.com)
2. Импортируйте проект из папки `frontend`
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. В Environment Variables добавьте:
   - `VITE_API_URL` = URL вашего бекенда
5. Деплой произойдет автоматически

## Настройка CORS

Убедитесь, что в `backend/main.py` в настройках CORS указан URL вашего фронтенда:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.vercel.app"],  # Замените на ваш URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Или для разработки можно оставить `allow_origins=["*"]`, но для продакшена лучше указать конкретные домены.

## Решение проблем

### Ошибка 404 NOT_FOUND

Если вы получаете ошибку 404 при доступе к фронтенду:

1. **Vercel**: Убедитесь, что в `vercel.json` настроены rewrites для SPA
2. **Netlify**: Убедитесь, что файл `public/_redirects` существует и содержит `/* /index.html 200`
3. **Проверьте переменные окружения**: Убедитесь, что `VITE_API_URL` правильно настроен

### Проблемы с API

Если фронтенд не может подключиться к бекенду:

1. Проверьте, что бекенд запущен и доступен по указанному URL
2. Проверьте CORS настройки в `backend/main.py`
3. Убедитесь, что переменная окружения `VITE_API_URL` на фронтенде указывает на правильный URL бекенда
4. Проверьте, что бекенд отвечает на запросы: откройте `https://your-backend-url.com/` в браузере

### Локальная проверка

Перед деплоем проверьте локально:

```bash
# Бекенд
cd backend
uvicorn main:app --reload --port 8000

# Фронтенд (в другом терминале)
cd frontend
npm install
npm run dev
```

## Проверка работоспособности

После деплоя проверьте:

1. Бекенд доступен по URL и отвечает на GET запросы (откройте `https://your-backend-url.com/` в браузере)
2. Фронтенд загружается и отображает интерфейс
3. Можно отправить сообщение через фронтенд
4. Сообщения сохраняются и отображаются после перезагрузки страницы
5. В консоли браузера нет ошибок CORS или 404


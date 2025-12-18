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

## Проверка работоспособности

После деплоя проверьте:

1. Бекенд доступен по URL и отвечает на GET запросы
2. Фронтенд загружается и отображает интерфейс
3. Можно отправить сообщение через фронтенд
4. Сообщения сохраняются и отображаются после перезагрузки страницы


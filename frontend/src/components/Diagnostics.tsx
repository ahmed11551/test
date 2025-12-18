import { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const Diagnostics = () => {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [apiUrl, setApiUrl] = useState<string>(API_BASE_URL)

  useEffect(() => {
    checkApiStatus()
  }, [])

  const checkApiStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        setApiStatus('online')
      } else {
        setApiStatus('offline')
      }
    } catch (error) {
      setApiStatus('offline')
    }
  }

  if (import.meta.env.MODE === 'production') {
    return null
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 m-2 text-xs">
      <div className="font-semibold mb-1">Диагностика:</div>
      <div>API URL: <code className="bg-yellow-100 px-1 rounded">{apiUrl}</code></div>
      <div>Статус: 
        <span className={`ml-1 font-semibold ${
          apiStatus === 'online' ? 'text-green-600' : 
          apiStatus === 'offline' ? 'text-red-600' : 
          'text-yellow-600'
        }`}>
          {apiStatus === 'online' ? '✓ Онлайн' : 
           apiStatus === 'offline' ? '✗ Офлайн' : 
           'Проверка...'}
        </span>
      </div>
      {apiStatus === 'offline' && (
        <div className="mt-2 text-red-600">
          ⚠ Бекенд недоступен. Проверьте:
          <ul className="list-disc list-inside mt-1 ml-2">
            <li>Бекенд запущен и доступен</li>
            <li>Переменная VITE_API_URL установлена правильно</li>
            <li>URL бекенда: {apiUrl}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Diagnostics


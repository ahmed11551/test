import { Message, MessageCreate } from './types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

console.log('API Base URL:', API_BASE_URL)
console.log('Environment mode:', import.meta.env.MODE)
console.log('All env vars:', import.meta.env)

const handleResponse = async (response: Response, errorMessage: string): Promise<any> => {
  if (!response.ok) {
    const status = response.status
    const statusText = response.statusText
    let errorDetails = ''
    
    try {
      const errorData = await response.json()
      errorDetails = errorData.detail || errorData.message || ''
    } catch {
      errorDetails = await response.text()
    }
    
    const fullError = `${errorMessage} (${status} ${statusText})${errorDetails ? `: ${errorDetails}` : ''}`
    console.error('API Error:', {
      url: response.url,
      status,
      statusText,
      details: errorDetails
    })
    throw new Error(fullError)
  }
  return response.json()
}

export const fetchMessages = async (): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return handleResponse(response, 'Failed to fetch messages')
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Cannot connect to API at ${API_BASE_URL}. Please check if the backend is running and VITE_API_URL is set correctly.`)
    }
    throw error
  }
}

export const sendMessage = async (message: MessageCreate): Promise<Message> => {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
    return handleResponse(response, 'Failed to send message')
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Cannot connect to API at ${API_BASE_URL}. Please check if the backend is running and VITE_API_URL is set correctly.`)
    }
    throw error
  }
}


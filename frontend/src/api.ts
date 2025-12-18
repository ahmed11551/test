import { Message, MessageCreate } from './types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch(`${API_BASE_URL}/messages`)
  if (!response.ok) {
    throw new Error('Failed to fetch messages')
  }
  return response.json()
}

export const sendMessage = async (message: MessageCreate): Promise<Message> => {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
  if (!response.ok) {
    throw new Error('Failed to send message')
  }
  return response.json()
}


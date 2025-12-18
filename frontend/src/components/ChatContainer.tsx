import { useState, useEffect, useRef } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { Message } from '../types'
import { fetchMessages, sendMessage } from '../api'

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadMessages = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedMessages = await fetchMessages()
      setMessages(fetchedMessages)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Не удалось загрузить сообщения'
      setError(errorMessage)
      console.error('Error loading messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    try {
      setError(null)
      const newMessage = await sendMessage({ text, sender: 'user' })
      setMessages((prev) => [...prev, newMessage])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Не удалось отправить сообщение'
      setError(errorMessage)
      console.error('Error sending message:', err)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-[420px] bg-white shadow-2xl overflow-hidden">
      <div className="bg-[#0088cc] text-white px-4 py-3 flex items-center shadow-md">
        <h1 className="text-lg font-medium">Telegram Chat</h1>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="h-full flex items-center justify-center bg-[#e5ddd5]">
            <div className="text-gray-500">Загрузка...</div>
          </div>
        ) : (
          <MessageList messages={messages} />
        )}
      </div>
      
      <div ref={messagesEndRef} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatContainer


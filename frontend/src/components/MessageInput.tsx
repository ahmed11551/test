import { useState, KeyboardEvent, useRef, useEffect } from 'react'

interface MessageInputProps {
  onSendMessage: (text: string) => void
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text)
      setText('')
      if (textareaRef.current) {
        textareaRef.current.style.height = '40px'
      }
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [text])

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex items-end space-x-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите сообщение..."
          className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
          rows={1}
          style={{ minHeight: '40px', maxHeight: '120px', overflowY: 'auto' }}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="bg-[#0088cc] text-white px-4 py-2 rounded-lg hover:bg-[#0077b3] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          Отправить
        </button>
      </div>
    </div>
  )
}

export default MessageInput


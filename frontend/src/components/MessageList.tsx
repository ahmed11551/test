import { Message } from '../types'
import MessageItem from './MessageItem'

interface MessageListProps {
  messages: Message[]
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="h-full overflow-y-auto bg-[#e5ddd5] px-4 py-4 space-y-2">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          Нет сообщений
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))
      )}
    </div>
  )
}

export default MessageList


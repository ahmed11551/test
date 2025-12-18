import { Message } from '../types'

interface MessageItemProps {
  message: Message
}

const MessageItem = ({ message }: MessageItemProps) => {
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <div className="flex justify-end">
      <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 max-w-[75%] shadow-sm relative">
        <p className="text-gray-800 text-sm whitespace-pre-wrap break-words pr-8">
          {message.text}
        </p>
        <div className="absolute bottom-1 right-2 flex items-center">
          <span className="text-[11px] text-gray-500 leading-none">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MessageItem


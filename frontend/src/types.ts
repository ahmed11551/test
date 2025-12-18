export interface Message {
  id: string
  text: string
  timestamp: string
  sender: string
}

export interface MessageCreate {
  text: string
  sender?: string
}


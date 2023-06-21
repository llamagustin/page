import type { Chat, ChatContact, ChatStatus } from '@/@fake-db/types'

export type ActiveChat = {
  chat?: Chat
  contact: ChatContact
} | null

export const useChat = () => {
  const blank_chat = {
    message: '',
    time: new Date(),
    //user_id: 11,
    feedback: {
      isSent: false,
      isDelivered: false,
      isSeen: false,
    },
  }

  const resolveAvatarBadgeVariant = (status: ChatStatus) => {
    return 'success';
    if (status === 300)
      return 'success'
    if (status === 'busy')
      return 'error'
    if (status === 'away')
      return 'warning'
    return 'secondary'
  }
  
  
  const resolveUserStatusVariant = (status: number) => {
    if (status >= 200 && status < 300) {
      return 'success'; 
    } else if (status >= 300 && status < 400) {
      return 'warning'; 
    } else if (status >= 400 && status < 500) {
      return 'error';
    } else {
      return 'primary'; 
    }
  }

  return {
    blank_chat,
    resolveUserStatusVariant,
    resolveAvatarBadgeVariant,
  }
}

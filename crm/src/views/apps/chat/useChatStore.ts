import type { ActiveChat } from './useChat'
import type { ChatContact, ChatContactWithChat, ChatMessage, ChatOut } from '@/@fake-db/types'
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import axiosIns from '@axios'

const profileUser = {
   id: 11,
   avatar: avatar1,
   fullName: 'John Doe',
   role: 'admin',
   about:
     'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie marshmallow.',
   status: 'online',
   settings: {
     isTwoStepAuthVerificationEnabled: true,
     isNotificationsOn: false,
   }
 }

export const useChatStore = defineStore('chat', {
  // ℹ️ arrow function recommended for full type inference
  state: () => ({
    contacts: [],
    activeChat: null,
    chats: [],
    profileUser: profileUser,
    auth: JSON.parse(localStorage.getItem('userData') || '{}')
  }),
  actions: {
    async fetchChats(userId, q: string) {
      
      const chats = await axiosIns.get('/chat/account/' + userId, {
        params: { q }
      }).then( res => res.data)
      
      const users = await axiosIns.get('/account/' + userId + '/leads', {
        params: { q }
      }).then( res => res.data.users)
  
      // this.chats = chats
      
      this.chats = chats
      this.contacts = users
      
      //show contacts
      //this.profileUser = profileUser
    },
    async getChat(user) {
      
      const { data } = await axiosIns.get(`/chat/${user.id}`)

        if(data == 404){
            this.activeChat = {
              contact: { ...user },
              messages: [],
              user_id: user.id,
            }
            // this.activeChat = {
            //   id: 1,
            //   userId: 2,
            //   unseenMsgs: 0,
            //   messages: [],
            //   contact: user
            // }
        }else{
            data.contact = user
            this.activeChat = data
        }
    //   this.activeChat = data

    },

    async sendMsg( account, user, message: ChatMessage['message']) {
      // const senderId = this.profileUser?.id
      // const { data } = await axiosInstance.post(`/chat`, {account, user, message })
      const getNameUser = (name) => {
        
        if(name?.name){
          return name.name + ' ' + name.firstSurname + ' ' + name.secondSurname
        }else{
          return 'NEW LEAD'
        }
      }

      
      // console.log('eeem',{
      //   emitId: account.id,
      //   userId: user.id,
      //   emit: {
      //     // avatar: account.avatar,
      //     name: getNameUser(account.name),
      //     email: account.email,
      //     phone: account.phone,
      //   },
      //   user: {
      //     // avatar: user.avatar,
      //     name: getNameUser(user.name),
      //     email: user.email,
      //     phone: user.phone,
      //   },
      //   userPhone: user.phone,
      //   message,
      // })
      const { data } = await axiosIns.post(`/chat`, {
        // user_id: user.id,
        emitId: account.id,
        userId: user.id,
        emit: {
          // avatar: account.avatar,
          name: getNameUser(account.name),
          email: account.email,
          phone: account.phone,
        },
        user: {
          // avatar: user.avatar,
          name: getNameUser(account.name),
          email: user.email,
          phone: user.phone,
        },
        userPhone: user.phone,
        message,
      })
      
      
      
      if(data.id) {
        this.chats.push(data);
        this.activeChat?.messages.push(data.messages[0]);
      } else {
        const senderId = this.activeChat.user_id
        
        const index = this.chats.findIndex(chat => Object.keys(chat.members).includes(senderId))
        
        if(index > -1) this.chats[index].messages.push(data)
        this.activeChat?.messages.push(data)
      }
    //   // ? If it's not undefined => New chat is created (Contact is not in list of chats)
    //   if (chat !== undefined) {
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     const activeChat = this.activeChat!

    //     // this.chatsContacts.push({
    //     //   ...activeChat.contact,
    //     //   chat: {
    //     //     id: chat.id,
    //     //     lastMessage: [],
    //     //     unseenMsgs: 0,
    //     //     messages: [msg],
    //     //   },
    //     // })

    //     if (this.activeChat) {
    //       this.activeChat.chat = {
    //         id: chat.id,
    //         messages: [msg],
    //         unseenMsgs: 0,
    //         userId: this.activeChat?.contact.id,
    //       }
    //     }
    //   }
    //   else {
    //     this.activeChat?.chat?.messages.push(msg)
    //   }

    //   // Set Last Message for active contact
    //   const contact = this.chatsContacts.find(c => {
    //     if (this.activeChat)
    //       return c.id === this.activeChat.contact.id

    //     return false
    //   }) as ChatContactWithChat

    //   contact.chat.lastMessage = msg
    },
  },
})

import type { Email, FetchEmailsPayload } from '@/@fake-db/types';
import axiosIns from '@axios';
import type { PartialDeep } from 'type-fest';
// axiosIns.defaults.baseURL = "https://api.aythen.com"

interface State {
  emails: Email[]
  emailsMeta: {
    draft: number
    inbox: number
    spam: number
  },
  typeAction: string,
}

// const axiosIns = axios.create({
//   baseURL: "https://test-api.aythen.com",
//   withCredentials: false,
//   headers: {
//     'Content-Type': 'application/json'
//     }
// });


export const useEmailStore = defineStore('email', {
  // ℹ️ arrow function recommended for full type inference
  state: (): State => ({
    emails: [],
    emailsMeta: {draft: 0, inbox: 0, spam: 0, },
    typeAction: 'create',
  }),
  actions: {
    async fetchEmails(payload: FetchEmailsPayload) {
      const response = await axiosIns.get('/email/emails', { params: payload })
      const { emails, emailsMeta } = response.data


      console.log('ddddd', response.data, payload)
      this.emails = emails
      this.emailsMeta = emailsMeta
      
      return response;
    },
    
    async saveEmail(data){
      const response = await axiosIns.post('/email/save/', data)
      return response
    },
    
    async sendEmail(data) {
      const response = await axiosIns.post('/email/send/', data)
      
      return response
    },

    async updateEmails(ids: Email['id'][], data: PartialDeep<Email>) {
      return await axiosIns.post('/email/update-emails/', { ids, data });
    },

    async updateEmailLabels(ids:any, label: any) {
      return await axiosIns.post('/email/update-emails-label', { ids, label })
    },
    async getTemplate(folder:string, template:string){
      return await axiosIns.get(`/email/template/${folder}/${template}`)
    }
  },
})

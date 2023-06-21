import axios from 'axios';
// axiosIns.defaults.baseURL = "https://api.aythen.com"

import type { Event, NewEvent } from './types';
import MiniMoment from "@/shared/utils/MiniMoment";


const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  // baseURL: "https://test-api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});


export function initialEvent() {
  const now = MiniMoment.createFormatToCalendar(new Date());
  const latter = MiniMoment.addAnHour(new Date());
  
  return {
    title: "",
    start: now,
    end: latter,
    allDay: false,
    lead_id: null,
    extendedProps: {
      calendar: undefined,
      guests: [],
      location: "",
      description: "",
    },
  }
}

const userData = JSON.parse(localStorage.getItem('userData'))

export const useCalendarStore = defineStore('calendar', {
  // arrow function recommended for full type inference
  state: () => ({
    availableCalendars: [
      {
        color: 'error',
        label: 'high'
      },
      {
        color: 'warning',
        label: 'medium'
      },
      {
        color: 'secondary',
        label: 'low'
      }
    ],
    selectedCalendars: ['high', 'medium', 'low'],
    users: [],
    leadId: null,
    priority: 'medium',
    allEvents: [],
    filterPriority: 'todos',
    Auth: JSON.parse(localStorage.userData || {}),
    todaysEvents: [],
  }),
  actions: {
    async getAllEvents(resellerId = null) {
      const id = resellerId || userData.id;
      const { data } = await axiosIns.get(`/calendar/get-all-events/${id}`)
      this.allEvents = data;
      return data;
    },
    async fetchEvents() {
      const query = new URLSearchParams({
        priority: this.filterPriority
      }).toString();
      const data = await axiosIns.get(`/calendar/events/${userData.id}?${query}`)
      this.getAllEvents();
      // this.allEvents = data.data;
      return data;
    },
    async addEvent(event: NewEvent) {
      console.log(event)
      try {
        event.user_id = userData.id;
        const formData = {
          ...event,
          lead_id: this.leadId,
          priority: this.priority
        }
        const data = await axiosIns.post('/calendar/events', formData);
        console.log(data)
        return data;
      } catch (error) {
        console.error(error)
      } 
    },
    async updateEvent(event: Event, typeUpdate: string = null) {
      const data = {
        ...event,
        lead_id: this.leadId,
        priority: this.priority,
        typeUpdate
      }
      return axiosIns.post(`/calendar/events/${event.id}`, data)
    },
    async removeEvent(eventId: string, eventOnline: boolean = false) {
      const response = await axiosIns.delete(`/calendar/events/${eventId}`);
      if(!eventOnline) {
        this.fetchEvents();
      }
      return response;
    },
    async getUsers(query?: string = '') {
      
      const { data } = await axiosIns.get("/account/"+this.Auth.id+"/leads")
      console.log('get users calendar', data)
      this.users = data.users;
    },
    async getEventsToday() {
      const leadId = this.leadId;
      const uri = "/calendar/get-events-today/" + leadId;
      const { data } = await axiosIns.get(uri);
      this.todaysEvents = data;
      return data;
    },
  },
})


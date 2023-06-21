import { defineStore } from 'pinia'
import type { ProjectParams } from './types'
import axiosIns from '@axios'

export const useProjectStore = defineStore('ProjectStore', {
  actions: {
    // 👉 Fetch all project
    fetchProjects(params: ProjectParams) {
      return axiosIns.get('/dashboard/analytics/projects', { params })
      // return axios.get('/dashboard/analytics/projects', { params })
    },
  },
})

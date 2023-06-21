import { defineStore } from 'pinia'
import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.aythen.com",
    withCredentials: false,
    headers: { 'Content-Type': 'application/json' }
});

export const useFreelancerListStore = defineStore('FreelancerListStore', {
    actions: {
        async fetchFreelancers(params:object) {
            return await instance.get('/freelancer', { params });
        },
        async fetchFreelancer(id:string) {
            return await instance.get(`/freelancer/${id}` );
        },
        async updateFreelancer(params:object) {
            return await instance.patch('/freelancer/update', { params });  
        },
        async postTask(params:object) {
            return await instance.post('/tasks/add', { params }); 
        },
        async getAllTasks(){
            return await instance.get('/tasks/');
        },
        async getSingleTask(id:string){
            return await instance.get(`/tasks/${id}`);
        },
        async updateCrmFreelancer(params:object) {
            return await instance.patch('/freelancer/crm/update', { params });  
        },
    }
})
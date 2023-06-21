import { defineStore } from 'pinia'
import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.aythen.com",
    withCredentials: false,
    headers: { 'Content-Type': 'application/json' }
});

export const useGPTListStore = defineStore('GPTListStore', {
    actions: {
        async fetchsGPT(params:object) {
            return await instance.get('/gpt-data', { params });
        },
        async fetchGPT(id:string) {
            return await instance.get(`/gpt-data/${id}` );
        },
        async updateGPT(params:object) {
            return await instance.patch('/gpt-data/update', { params });  
        },
        async postGPT(params:object) {
            return await instance.post(`/gpt-data/${id}`, { params }); 
        }
    }
})
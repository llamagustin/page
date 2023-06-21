import { FreelancerProperties } from '@/@fake-db/types';
import { AxiosResponse } from 'axios';
import axiosIns from '@axios';

export const initialState: FreelancerProperties = {
  "id": "",
  "avatar": "",
  "fullname": "",
  "about": "",
  "profile": "",
  "skills": {},
  "experiences": [],
  "academies": [],
  "address": {
    "country": "España",
    "province": "",
    "city": "",
    "code": "",
    "line": "",
  },
  "rangosalarial": {
    "min": 0,
    "max": 0
  },
  "rate": 0,
  "language": "",
  "timezone": "",
  "category": "",
  "subcategory": "",
  "createdAt": "",
  "updatedAt": ""
}

interface FreelancerResponse {
  data: FreelancerProperties;
}

export function useFreelancer() {
  
  function getList(params = {}): Promise<AxiosResponse> {
    const query = new URLSearchParams(params).toString();
    return axiosIns.get(`https://test-api.aythen.com/freelancer/list?${query}`);
  }
  
  function findOne(id: string): Promise<FreelancerResponse> {
    return axiosIns.get(`https://test-api.aythen.com/freelancer/${id}`);
  }
  
  function store(formData) {
    return axiosIns.post(`https://test-api.aythen.com/freelancer`, formData);
  }
  
  function update(id, formData) {
    return axiosIns.put(`https://test-api.aythen.com/freelancer/${id}`, formData);
  }
  
  function destroy(id: string) {
    return axiosIns.delete(`https://test-api.aythen.com/freelancer/${id}`)
  }
  
  return {
    getList,
    findOne,
    store,
    update,
    destroy
  }
}

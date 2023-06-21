import { AxiosResponse } from 'axios';
import axios from '@axios';

interface TeamFreelancer {
  id?: string;
  name: string;
  description: string;
  members: string[];
  status?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const initialStateTeamFreelancer: TeamFreelancer = {
  id: "",
  name: "",
  description: "",
  members: [],
  status: 200
}

interface TeamFreelancerResponse {
  data: TeamFreelancer;
  count?: number;
  countPages?: number;
}

export function useTeamFreelancer() {
  
  function getList(params = {}): Promise<AxiosResponse> {
    const query = new URLSearchParams(params).toString();
    return axios.get(`https://test-api.aythen.com/team-freelancers?${query}`);
  }
  
  function findOne(id: TeamFreelancer['id']): Promise<TeamFreelancerResponse> {
    return axios.get(`https://test-api.aythen.com/team-freelancers/${id}`);
  }
  
  function store(payload: TeamFreelancer) {
    return axios.post(`https://test-api.aythen.com/freelancer`, payload);
  }
  
  function update(id: TeamFreelancer['id'], payload: TeamFreelancer) {
    return axios.put(`https://test-api.aythen.com/team-freelancers/${id}`, payload);
  }
  
  function destroy(id: string) {
    return axios.delete(`/team-freelancers/${id}`)
  }
  
  return {
    getList,
    findOne,
    store,
    update,
    destroy
  }
}

import { GPTDataResponse, GPTData } from "./types";
import { AxiosResponse } from 'axios';
import { toURLSearchParams } from "@/shared/utils/url";
import axiosIns from '@axios';

export const initialStateGPTData: GPTData = {
  "id": "",
  "title": "",
  "category": [],
  "used": 0,
  "author": {
    "name": "",
    "avatar": "",
    "followers": 0
  },
  "input": "",
  "output": ""
}

export function useGPT() {
  
  function fetchGPTData(params = {}): Promise<AxiosResponse> {
    const query = toURLSearchParams(params);
    return axiosIns.get(`https://test-api.aythen.com/gpt-data?${query}`);
  }
  
  function findOne(id: string): Promise<GPTDataResponse> {
    return axiosIns.get(`https://test-api.aythen.com/gpt-data/${id}`);
  }
  
  function store(payload: GPTData): Promise<GPTDataResponse> {
    return axiosIns.post(`https://test-api.aythen.com/gpt-data`, payload);
  }
  
  function update(id: string, payload: GPTData): Promise<GPTDataResponse> {
    return axiosIns.put(`https://test-api.aythen.com/gpt-data/${id}`, payload);
  }
  
  function destroy(id: string): Promise<AxiosResponse> {
    return axiosIns.delete(`https://test-api.aythen.com/gpt-data/${id}`)
  }
  
  return {
    fetchGPTData,
    findOne,
    store,
    update,
    destroy
  }
}

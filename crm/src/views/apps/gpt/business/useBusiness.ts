import { BusinessResponse, Business } from "./types";
import { AxiosResponse } from 'axios';
import { toURLSearchParams } from "@/shared/utils/url";
import axiosIns from '@axios';

export const initialStateBusiness: Business = {
  id: "",
  image: "",
  title: "",
  email: "",
  password: "",
  description: "",
  user_id: "",
  phone: "",
  category: [],
  status: 400,
  address: {
    country: "España",
    province: "",
    city: "",
    zip: "",
    line: "",
  }
}

export function useBusiness() {
  
  function fetchBusiness(params = {}): Promise<AxiosResponse> {
    const query = toURLSearchParams(params);
    return axiosIns.get(`https://test-api.aythen.com/business?${query}`);
  }
  
  function findOne(id: string): Promise<BusinessResponse> {
    return axiosIns.get(`https://test-api.aythen.com/business/${id}`);
  }
  
  function store(formData): Promise<BusinessResponse> {
    return axiosIns.post(`https://test-api.aythen.com/business`, formData);
  }
  
  function update(id, formData): Promise<BusinessResponse> {
    return axiosIns.put(`https://test-api.aythen.com/business/${id}`, formData);
  }
  
  function destroy(id: string): Promise<AxiosResponse> {
    return axiosIns.delete(`https://test-api.aythen.com/business/${id}`)
  }
  
  return {
    fetchBusiness,
    findOne,
    store,
    update,
    destroy
  }
}

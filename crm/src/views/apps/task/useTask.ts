import { TaskResponse, Task } from "./types";
import { AxiosResponse } from "axios";
import axiosIns from '@axios';
import { toURLSearchParams } from "@/shared/utils/url";
import { cloneDeep } from "lodash"

const userData = JSON.parse(localStorage.getItem('userData'))

export const initialStateTask: Task = {
  offer_id: null,
  title: "",
  description: "",
  isCompleted: false,
  isDeleted: false,
  isImportant: false,
  data: [],
  user_id: userData.id,
  user_data: {},
  hourlyrate: 0,
  weeklimit: null,
  picked: "",
  selectedcurrency: "EUR",
  tarifa: 0
}


const task = ref(cloneDeep(initialStateTask));

export function useTask() {
  function fetchAllTasks(params = {}): Promise<TaskResponse> {
    const query = toURLSearchParams(params);
    return axiosIns.get(`https://test-api.aythen.com/tasks?${query}`);
  }
  
  function findOne(id: string): Promise<Task> {
    return axiosIns.get(`https://test-api.aythen.com/tasks/${id}`);
  }
  
  function store(payload: Task): Promise<Task> {
    return axiosIns.post('https://test-api.aythen.com/tasks', payload);
  }
  
  function update(id: string, payload: Task): Promise<Task> {
    return axiosIns.put(`https://test-api.aythen.com/tasks/${id}`, payload);
  }
  
  function destroy(id: string): Promise<AxiosResponse> {
    return axiosIns.delete(`https://test-api.aythen.com/tasks/${id}`)
  }
  
  function setTask(data?: Task) {
    if(!data) return task.value = cloneDeep(initialStateTask);
    task.value = cloneDeep(data);
  }
  
  return {
    setTask,
    task,
    
    fetchAllTasks,
    findOne,
    store,
    update,
    destroy
  }
}

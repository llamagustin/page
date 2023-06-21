export interface TaskResponse {
  tasks: Task[];
  count: number;
  totalPages: number;
}

export interface Task {
  offer_id?: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  isDeleted?: boolean;
  isImportant?: boolean;
  data: string[];
  user_id: string;
  user_data: Userdata;
  hourlyrate?: any;
  weeklimit: number;
  picked: string;
  selectedcurrency: string;
  tarifa: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Userdata {
  avatar?: string;
  fullname?: string;
}
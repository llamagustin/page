export interface BusinessResponse {
  data: Business;
}

export interface Business {
  id: string;
  email: string;
  password: string;
  image: string;
  user_id: string;
  phone: string;
  title: string;
  category: any[];
  status: number;
  description: string;
  address: Address;
  createdAt?: string;
  updatedAt?: string;
}

interface Address {
  country: string;
  province: string;
  zip: string;
  city: string;
  line: string;
}
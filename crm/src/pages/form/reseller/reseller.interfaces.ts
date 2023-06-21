export interface Guest {
  fullName: string;
  company: string;
  username: string;
  email: string;
  address: Address;
  zone: any[];
  notification: any[];
  web: string;
  phone: string;
  nif: string;
  password: string;
  role: string;
  status: number;
  category: any[];
  plan: string[];
  budget: string;
  typeSelfEmployed: string;
  knowDigitalKit: number | null,
  abilities:[]
}

export interface Address {
  country: string;
  province: string;
  city: string;
  zip: string[];
  line: string;
  latitude: string;
  longitude: string;
}

export interface Province {
  title: string;
  value: string;
}

export interface City {
  title: string;
  value: string;
}

export interface ZipCode {
  codigo_postal: string;
  municipio_id: number;
  municipio_nombre: string;
}

export interface FullCalendarEvent {
  id: string | null,
  title: string | null;
  start: Date | null;
  borderColor: string;
  allDay: boolean
}

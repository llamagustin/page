export const initialStateGuest = {
  fullName: "",
  company: "",
  username: "",
  email: "",
  address: {
    country: "España",
    province: "",
    city: "",
    zip: [],
    line: "",
    latitude: "",
    longitude: "",
  },
  zone: [],
  notification: [],
  web: "",
  phone: "",
  nif: "",
  password: "1234",
  role: "reseller",
  status: 300,
  category: [],
  plan: [],
  budget: "",
  typeSelfEmployed: null,
  knowDigitalKit: null,
  abilities:{}
};

export const initialStateFCEvent = {
  id: null,
  type:null,
  title: null,
  start: null,
  borderColor: "gray",
  allDay: true
}
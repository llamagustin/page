import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://api-prod.aythen.com",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  }
})
  
import { onMounted } from "vue";

export function useUbigeo() {
  const ubigeo = reactive({
    provinces: [],
    cities: [],
    codes: []
  });

  function getProvinces() {
    axiosIns.get('/address/province/all')
      .then(({ data }) => {
        ubigeo.provinces = data;
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  function getCities(value) {
    return axiosIns.get(`/address/city/${value}`)
      .then(({ data }) => {
        ubigeo.cities = data;
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  function getCodes(value) {
    return axiosIns.get(`/address/code/${value}`)
      .then(({ data }) => {
        ubigeo.codes = data;
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  onMounted(getProvinces)
  
  return {
    getCodes,
    getCities,
    ubigeo
  }
}
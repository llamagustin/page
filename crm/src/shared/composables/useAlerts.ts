import axios from "@axios";
import { toURLSearchParams } from "@/shared/utils/url";


const userData = localStorage.userData ? JSON.parse(localStorage.userData) : null;


const alerts = ref([]);

async function fetchAlerts(params: any) {
  let query = toURLSearchParams(params);
  const { data } = await axios.get(`alerts?${query}`);
  return data;
}

async function updateAlert(notificationId: string, payload: any) {
  return await axios.put(`alerts/${notificationId}`, payload);
}


export function useAlerts() {
  return {
    updateAlert,
    fetchAlerts,
    alerts
  }
}

(async function (){
  const { data } = await axios.get(`alerts?user_id=${userData.id}`);
  alerts.value = data;
})();
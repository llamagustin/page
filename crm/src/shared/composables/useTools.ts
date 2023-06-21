import axios from "@axios";
import { ref } from "vue";

const tools = ref([]);

const fetchTools = async () => {
  const { data } = await axios.get('https://api.aythen.com/tool');
  tools.value = data;
}
fetchTools()

export function useTools() {
  
  return {
    tools
  }
}
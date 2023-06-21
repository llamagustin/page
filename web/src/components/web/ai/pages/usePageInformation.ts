import { ref, computed } from "vue"
import DataJson from "./data.json";
import axios from "axios";

function getRandomElements(array, count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const element = array[randomIndex];
    result.push(element);
  }
  return result;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function fetchFreelancers() {
  try {
    const uri = "https://test-api.aythen.com/freelancer/list?perPage=20&currentPage=1";
    const { data } = await axios.get(uri);
    freelancers.value = getRandomElements([...data.freelancers], 4);
  } catch(err) {}
}
async function fetchTools() {
  try {
    const uri = "https://test-api.aythen.com/tool";
    const { data } = await axios.get(uri);
    tools.value = data;
  } catch(err) {}
}

const initialStatePrompt = {
  id: "",
  title: "",
  category: [],
  used: 0,
  author: {
    name: "Aythen",
    avatar: "",
    followers: 0
  },
  service: "",
  input: "",
  output: ""
}

const listPromps = ref(shuffleArray([...DataJson]));
const freelancers = ref([]);
const tools = ref([]);
const filters = ref({});
const randomPrompt = ref({});

fetchTools()
fetchFreelancers()

export const usePageInformation = () => {
  const formPrompt = ref({ ...initialStatePrompt });
  
  function storePrompt() {
    listPromps.value.push(formPrompt.value);
    formPrompt.value = { ...initialStatePrompt };
  }
  
  const promptsFiltered = computed(() => {
    const filtered = [...listPromps.value];
    const { service, search = '' } = filters.value;
    
    if(service && search) return filtered.filter(c => 
      c.service == service && c.title.toLowerCase().includes(search.trim().toLowerCase())
    )
    if(service) return filtered.filter(c => c.service == service);
    if(search.trim()) return filtered.filter(c => c.title.toLowerCase().includes(search.trim().toLowerCase()));
    return filtered;
  })
  
  const countPrompts = computed(() => {
    return listPromps.value.reduce((acc, c) => {
      let key = c.service.toLowerCase();
      acc[key] = acc[key] ? acc[key] + 1 : 1;
      return acc;
    },{});
  });
  
  const fetchRandomPromptPerService = (nameService) => {
    let list = DataJson.filter(c => c.service == nameService);
    randomPrompt.value = getRandomElements(list, 1)[0];
  }
  
  return {
    storePrompt,
    fetchRandomPromptPerService,
    formPrompt,
    listPromps,
    promptsFiltered,
    countPrompts,
    filters,
    freelancers,
    randomPrompt,
    tools
  }
}
import { ref } from 'vue';
export const useLocalStorage = (key: string) => {
  const data = ref(undefined)
  try {
    let value = localStorage.getItem(key);
    const regex = new RegExp("\({|\[|\}\]|)");
    if (value.match(regex)) {
      value = JSON.parse(value);
    }
    data.value = value;
  } catch (error) {
    console.error('No support window.LocalStorage');
  }

  return data
}
import { defineStore } from 'pinia';
import { initialStateGuest } from './reseller.data';
import { Guest } from './reseller.interfaces';

export const useResellerStore = defineStore('reseller', () => {
  const guest: Guest = reactive(initialStateGuest);
  const lastStep = ref<number>(4)
  const showQuestions = ref<boolean>(false)
  
  return {
    guest,
    lastStep,
    showQuestions
  }
})




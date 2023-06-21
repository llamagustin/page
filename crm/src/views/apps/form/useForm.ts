export const useForm = () => {
 const infoForm = ref({
  address: 'Barcelona, 08130, España',
  city: 'Santa Perpetua de Mogoda',
  email: 'info@aythen.com',
  phone: '+44 (876) 543 2198'
 })
 
 return {
  infoForm
 }
}

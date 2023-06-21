import axios from '@axios';
const instance = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});



export const useAddress = () => {
  
  const getProvince = async (province) => {
       return instance.get('/address/province/' + province).then( (res) => {
        return res.data
      }).catch( err => console.log(err) )
  }
  
  const getCity = (city) => {
      return instance.get('/address/city/' + city).then( (res) => {
        return res.data
      }).catch( err => console.log(err) )
  }
  
  const getCode = (code) => {
      return instance.get('/address/code/' + code).then( (res) => {
        return res.data
      }).catch( err => console.log(err) )
  }
  
  const getAddressFromCode = (code) => {
      return instance.get('/address/getter/code/' + code).then( (res) => {
        return res.data
      }).catch( err => console.log(err) )
  }
  
  return {
    getProvince,
    getCity,
    getCode,
    getAddressFromCode
  }
}


export const untilDate = (date) => {
  // Calculate the number of milliseconds between the current date and the given date
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const today = new Date();
  const targetDate = new Date(date);
  const differenceMs = targetDate - today;
  
  // Convert the difference in milliseconds to days
  const days = Math.ceil(differenceMs / millisecondsPerDay);
  
  // Return the result in a human-readable text format
  if (days === 0) {
    // return "Today is the date";
    return 'Hoy es la fecha';
  } else if (days === 1) {
    // return "1 day left";
    return 'Falta 1 día';
  } else {
    // return days + " days left";
    return 'Faltan ' + days + ' días';
  }
}


export const timeAgo = (date) => {
  const now = new Date();
  const elapsed = now - new Date(date);

  if (elapsed < 1000) return 'just now';

  const seconds = Math.round(elapsed / 1000);
  const minutes = Math.round(elapsed / 1000 / 60);
  const hours = Math.round(elapsed / 1000 / 60 / 60);
  const days = Math.round(elapsed / 1000 / 60 / 60 / 24);
  const months = Math.round(elapsed / 1000 / 60 / 60 / 24 / 30);
  const years = Math.round(elapsed / 1000 / 60 / 60 / 24 / 365);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 30) return `${days} days ago`;
  if (months < 12) return `${months} months ago`;
  return `${years} years ago`;
}

export const formatDMY = (fechaISO) => {
  const fecha = new Date(fechaISO);
  const day = fecha.getUTCDate().toString().padStart(2, "0");
  const month = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = fecha.getUTCFullYear().toString();
  return `${day}-${month}-${year}`;
}
export const getUsername = (fullname: string) => {
  const arr = fullname.split(' ');
  return `${arr[0]}${arr[1]}`;
}
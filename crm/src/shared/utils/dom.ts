export const loadScript = async (src) => {
  // const script = document.createElement('script');
  // script.src = src;
  // script.async = true;
  // document.head.appendChild(script);
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

}
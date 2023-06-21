
export const localStore = (path = false, arr) => {
    if(!path) return false
    
    var filters = JSON.parse(localStorage.getItem(path) || '{}');
    
    var keys = Object.keys(arr)
    
    
    for(var i = 0; i<keys.length; i++){
      var key = keys[i]
      filters[key] = arr[key]
    }
  
    localStorage.setItem(path, JSON.stringify(filters))
}


export const sessionStore = (path = 'root') => {
    const dataSession= JSON.parse(sessionStorage.getItem("filters" + path)) || {};
    
    const setSession = (arr) => {
      var filters = JSON.parse(sessionStorage.getItem("filters-" + path)) || {};
      
      for(var i = 0; i<arr.length; i++){
        var item = arr[i]
        filters[item.key] = item.value
      }
      
      sessionStorage.setItem("filters",JSON.stringify(filters))
    }
    
    const addSession = (arr) => {
        if(typeof arr == 'object'){
            sessionStorage.setItem("filters",JSON.stringify(arr))
        }else{
            console.error('Not is object.')
        }
    }
    
    const local=(item, initial = '')=>{
      let qr = dataSession[item]
      return qr || initial
    }
    
    return {
        dataSession,
        setSession,
        addSession,
        local
    }   
}
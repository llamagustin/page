
export const useLeadGenerator = () => {
    //importFile
    const importFile = () => {
      const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', '.csv');
        input.addEventListener('change', async () => {
          let files = input.files;
          var items = await new Promise((resolve, reject) => {
            Papa.parse(files[0], {
                header: true,
                download: true,
                skipEmptyLines: true,
                complete: function (results) {
                    resolve(results.data);
                }
            });
          })
          
          
          var data = []
          items.map( item => {
            
            data.push({
              faqs: [{
                q: item['Cualificación 2'],
                a: item['Cualificación 2 respuesta']
              }],
              source: item['Fuente'],
              interes: item['Nivel de interés'],
              
              email: item['email'],
              
              date: item['fecha'],
              fullName: item['nombre'],
              
              address: item['ubicación del candidato(a)'],
              phone: item['teléfono'],
              
              charge: item['puesto actual'],
              status: item['Valoración pendiente'],
              eduacation: item['educación'],
            })
          })
          
          console.log('d', data)
          
          
          accountListStore.importData(data)
     
        });
        input.click();
    }
    
    return {
        importFile
    }

}
//verbosetechlabs
(async function(){
   function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
   }
   
   function getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = 1080//img.width;
      canvas.height = 2340//img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      return dataURL
    }

   var app = {
        title: `string`,
        subtitle: `string`,
        resume: `string`,
        app: [{
            title: 'string',
            type: 'both',
            info: `string`,
            phone: `string`,
            password: 'string'
        }],
        data: [{
            title: `string`,
            info: `string`,
            content: [ 'string' ]
        }],
    }

    var path_title = 'body > div > section.app_banner_area > div > div > div.col-lg-7.mt-5.pt-3 > div > h1'
    var path_subtitle = 'body > div > section.app_banner_area > div > div > div.col-lg-7.mt-5.pt-3 > div > h3'
    var path_resume = 'body > div > section.app_banner_area > div > div > div.col-lg-7.mt-5.pt-3 > div > p'
    
    
    var path_list_app_tab = '#download-app-demo > div > div.row.no-gutters > div > div > div.container > div > ul > li > a'
    var path_list_app_panel = '#download-app-demo .owl-stage > div'
    var path_list_app_data = '.row > div'
    var path_list_app_type = 'a.app_btn.app_btn_one.Cus_getapp'
    

    
    var ini = 8
    var offset = 4
    
    
    var path_list_data = (num) => {
        return 'body > div > section:nth-child(' + (ini + num) + ')'
    }

    

    app.title = document.querySelector(path_title).textContent.trim()
    app.subtitle = document.querySelector(path_subtitle).textContent.trim()
    app.resume = document.querySelector(path_resume).textContent.trim()
    
    
    //data
    for(var i=0;i<offset;i++){
        var panel = document.querySelector(path_list_data(i))
        
        app.data[i] = {
            title: panel.querySelector('h2').textContent.split('.')[1].trim(),
            info: panel.querySelector('p').textContent.trim(), 
            content: [],
            images: []
        }
        
        //content
        var content = panel.querySelector('.slider-button > div').children
        for(var j=0;j<content.length;j++){
            var label = content[j].textContent.trim()
            app.data[i].content.push(label)
        }

        //photo
        var images = panel.querySelector('.owl-stage').children
        
        for(var j=0;j<images.length;j++){
            var img = images[j].querySelector('img')//.getAttribute('src')
            //app.data[i].images.push(img)
            var base64 = getBase64Image(img);
            app.data[i].images.push(base64)
            
        }
    }
    
    
    //apps
    var data_app = document.querySelectorAll(path_list_app_tab)
    for(var i=0; i<data_app.length;i++){
        data_app[i].click()
        await sleep(500)
        
        var panel = document.querySelectorAll(path_list_app_panel)[i]
        var panel_data = panel.querySelector(path_list_app_data).children
        
        app.app[i] = {
            //title: panel.querySelector(path_list_app_title).textContent.trim(),,
            type: panel.querySelector(path_list_app_type).textContent.trim(),
            info: panel_data[0].textContent.trim(),
            user: panel_data[2].querySelector('strong').textContent.trim(),
            password: panel_data[3].querySelector('strong').textContent.trim(),
        }
        
        app.app[i].title = data_app[i].outerText
        
        switch (app.app[i].type) {
            case 'Download App':
                app.app[i].type = 'both'
                break;
            case 'Backend Demo':
                app.app[i].type = 'web'
                break;
            default:
                app.app[i].type = 'bot'
                break;
        }
    }
    
    
    console.log('app: ', app)
})()



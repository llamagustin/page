
//https://www.google.com/maps/search/empresas/@41.5478707,2.2026221,19.01z

//
var delay = ms => new Promise(res => setTimeout(res, ms));
var randomString = (length = 5) => {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomstring = '';
    for (var i=0; i<length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
}





//var path = '#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd'
var a = 'a.hfpxzc'

var path_search_input = '#searchboxinput'
var path_search_btn = '#searchbox-searchbutton'

var path_panel = '#QA0Szd > div > div > div.w6VYqd > div.bJzME.Hu9e2e.tTVLSc'
//var path_list = '#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd'
var path_list = '#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd > div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd'

var path_zoom_in = '#widget-zoom-in'
var path_zoom_out = '#widget-zoom-out'

var class_target = '.Nv2PK'
var class_name = '.DUwDvf'
var class_phone = 'button[data-tooltip="Copy phone number"]'

var class_category = '.DkEaL'
var class_city = '.rogA2c'
var class_address = '.AeaXub'
var class_web = 'a[aria-label^="Website"]'

var panel = null 

var data = {};


/*
    Data
*/

const city_business = 'Mollet del Valles'
const type_business = 'restaurante'
const precission_business = 3 //5 => 20 business x address (5), 0 => dev

var getLatLon = () => {
    var address = location.pathname.split('/')[4].split(',');
    
    return {
        lat: address[0].slice(1),
        lon: address[1]
    }
}


var dLatLon = (lat, lon, dy = 0, dx = 0) => {
    var earth = 6378.137,  //radius of the earth in kilometer
        pi = Math.PI,
        m = (1 / ((2 * pi / 360) * earth)) / 1000;  //1 meter in degree
    
    var new_latitude = lat + (dy * m);
    
    
    var earth = 6378.137,  //radius of the earth in kilometer
        pi = Math.PI,
        cos = Math.cos,
        m = (1 / ((2 * pi / 360) * earth)) / 1000;  //1 meter in degree
    
    var new_longitude = lon + (dx * m) / cos(lat * (pi / 180));
 
    return {
        lat: new_latitude,
        lon: new_longitude
    }   
}
    
    
//41.535407 2.179729 


var getBusiness = async (city = 'Mollet del Valles', type = 'Restaurant') => {
    //set city
    document.querySelector(path_search_input).value = city 
    document.querySelector(path_search_input).dispatchEvent(new KeyboardEvent('keydown', { 'key': 13 }));
    await delay(2000);
    
    document.querySelector(path_search_btn).click()
    await delay(1000);
    
    //zoom
    var zoom = 16
    var _zoom = parseFloat(location.pathname.split('/')[4].split(',').pop().slice(0, -1))
    for(var i = 0; i<20; i++ ){
        document.querySelector(path_zoom_in).click()
        
        await delay(1000);
        _zoom = parseFloat(location.pathname.split('/')[4].split(',').pop().slice(0, -1))
        
        if(_zoom >= zoom) i = 99
    }
    
    //set type 
    document.querySelector(path_search_input).value = type 
    document.querySelector(path_search_input).dispatchEvent(new KeyboardEvent('keydown', { 'key': 13 }));
    await delay(2000);
    
    document.querySelector(path_search_btn).click()
    await delay(1000);
    
    //scroll
    var precission = 6
    for(var j = 0; j<precission;j++){
        await scroll()
        await delay(500)
    }
    
    
    var arr = Array.from(document.querySelector(path_list).children);
    //console.log('arr', arr)
    for(var n = 0; n< arr.length; n++){
        //console.log('aa', arr[i], typeof arr[i])
        
        if(typeof arr[n] == 'undefined') continue;
        
    	var contain = arr[n].classList.length;
    	if(contain == 0){
    	    var item = arr[n];
    	    
    		item.querySelector('a').click();
            await delay(2000);
            
            if(panel == null){
                await delay(2000);
                panel = document.querySelector(path_panel);
            }
            
      
            //var key = window.btoa(panel.querySelector(class_name).textContent.trim());
            var key = window.btoa(unescape(encodeURIComponent( panel.querySelector(class_name).textContent.trim() )))
            
            console.log('key', key)
            
            if(data[key]) continue;
            
            //data 
            data[key] = {}
            
            
            data[key].username = randomString(6)
            data[key].status = 'pending'
            data[key].plan = 'segment-one'
            data[key].budget = 2000
            data[key].coords = getLatLon()
            
            //
            //data[key].ref = randomString(6)
    		//data[key].date = new Date()
            
            //console.log('panel', panel)
    		var name = panel.querySelector(class_name);
    		if(name){
    		    data[key].name = name.textContent.trim()
    		}else{
    		    data[key].name = 'Not found';
    		}
    		
    		data[key].fullName = data[key].name
    		
    		
    		
    		var web = panel.querySelector(class_web);
    		if(web){
    		    if(web == 'instagram.com' || web == 'facebook.com'){
    		        data[key].web = false;
    		    }else{
    		        data[key].web = web.textContent.trim();   
    		    }
    		}else{
    		    data[key].web = false;
    		}
    		
    		
    		var category = panel.querySelector(class_category);
    		if(category){
    		    data[key].category = category.textContent.trim();
    		}else{
    		    data[key].category = false;
    		}
    		
    		/*
    		var city = panel.querySelector(class_city);
    		if(city){
    		    data[key].city = city.textContent.trim();
    		}else{
    		    data[key].city = false;
    		}
    		*/
    		data[key].city = city
    		
    		var address = panel.querySelector(class_address);
    		if(address){
    		    data[key].address = address.textContent.trim();
    		}else{
    		    data[key].address = false;
    		}
    		
    		var phone = panel.querySelector(class_phone);
    		if(phone){
    		    data[key].phone = phone.textContent.trim();
    		}else{
    		    data[key].phone = false;
    		}
    
        		
console.log(`Name: ${data[key].name}
Category: ${data[key].category}
Web: ${data[key].web}
Phone: ${data[key].phone}
City: ${data[key].city}
`)
        		
        		/*Connect web to aythen*/
        	}
    };
    
    //console.log(JSON.stringify(data))
    

    //
    var keys = Object.keys(data)
    var n = keys.length
    
    var n_no_web = Object.values(data).filter(x => x.web == false)
    var n_web = n - n_no_web.length
    
    var contacts = n_no_web.map(x => x.name).join('\n')
    
    console.log(`Datos:
${n} todas estas webs
${n_no_web.length} sin web
${n_web} con web

contactos potenciales:
${contacts}`)
    
}

var setCity = async (city = 'Mollet del Valles', zoom = 21) => {
    //set lat
    document.querySelector(path_search_input).value = city //+ ' ' + type
    document.querySelector(path_search_input).dispatchEvent(new KeyboardEvent('keydown', { 'key': 13 }));
    await delay(2000);
    
    document.querySelector(path_search_btn).click()
    
    await delay(1000);
    
    //set zoom
    var _zoom = parseFloat(location.pathname.split('/')[4].split(',').pop().slice(0, -1))
    for(var i = 0; i<20; i++ ){
        document.querySelector(path_zoom_in).click()
        
        await delay(1000);
        _zoom = parseFloat(location.pathname.split('/')[4].split(',').pop().slice(0, -1))
        
        if(_zoom >= zoom) i = 99
    }
    
    await delay(2000);
    
    //
    var address = []
    var _address = location.pathname.split('/')[4].split(',');

    //ini
    address[0] = {
        lat: parseFloat(_address[0].slice(1)),
        lon: parseFloat(_address[1]),
        dX: 0,
        dY: 0
    }
    
    
    //1000metros
    var log = 1
    
    //top
    address[1] = dLatLon(address[0].lat, address[0].lon, 1000/log, 0)
    address[1].dX = 1000/log; address[1].dY = 0;
    
    //bottom
    address[2] = dLatLon(address[0].lat, address[0].lon, -1000/log, 0)
    address[2].dX = -1000/log; address[1].dY = 0;
    
    //left
    address[3] = dLatLon(address[0].lat, address[0].lon, 0, -1000/log)
    address[3].dX = 0; address[1].dY = -1000/log;
    
    //right
    address[4] = dLatLon(address[0].lat, address[0].lon, 0, 1000/log)
    address[4].dX = 0; address[1].dY = 1000/log;
    

    return address
    
}

var getBusiness1 = async (city = 'Mollet del Valles', business = 'restaurante') => {
    var coords_address = await setCity(city) //address
    console.log('coords', coords_address)
    
    //for(var i = 0;i< coords_address.length; i++){
    for(var i = 0;i< 1; i++){
        await setLatLon(coords_address[i].lat, coords_address[i].lon, business)
        
        for(var j = 0; j<precission_business;j++){
            await scroll()
            await delay(500)
        }
        
        var arr = Array.from(document.querySelector(path_list).children);
        //console.log('arr', arr)
        for(var n = 0; n< arr.length; n++){
            //console.log('aa', arr[i], typeof arr[i])
            
            if(typeof arr[n] == 'undefined') continue;
            
        	var contain = arr[n].classList.length;
        	if(contain == 0){
        	    var item = arr[n];
        	    
        		item.querySelector('a').click();
                await delay(2000);
                
                if(panel == null){
                    await delay(2000);
                    panel = document.querySelector(path_panel);
                }
                
          
                //var key = window.btoa(panel.querySelector(class_name).textContent.trim());
                var key = window.btoa(unescape(encodeURIComponent( panel.querySelector(class_name).textContent.trim() )))
                
                console.log('key', key)
                
                if(data[key]) continue;
                
                //data 
                data[key] = {}
                
                
                data[key].username = randomString(6)
                data[key].status = 'pending'
                data[key].plan = 'segment-one'
                data[key].budget = 2000
                
                //
                //data[key].ref = randomString(6)
        		//data[key].date = new Date()
                
                //console.log('panel', panel)
        		var name = panel.querySelector(class_name);
        		if(name){
        		    data[key].name = name.textContent.trim()
        		}else{
        		    data[key].name = 'Not found';
        		}
        		
        		data[key].fullName = data[key].name
        		
        		
        		
        		var web = panel.querySelector(class_web);
        		if(web){
        		    if(web == 'instagram.com' || web == 'facebook.com'){
        		        data[key].web = false;
        		    }else{
        		        data[key].web = web.textContent.trim();   
        		    }
        		}else{
        		    data[key].web = false;
        		}
        		
        		
        		var category = panel.querySelector(class_category);
        		if(category){
        		    data[key].category = category.textContent.trim();
        		}else{
        		    data[key].category = false;
        		}
        		
        		/*
        		var city = panel.querySelector(class_city);
        		if(city){
        		    data[key].city = city.textContent.trim();
        		}else{
        		    data[key].city = false;
        		}
        		*/
        		data[key].city = city
        		
        		var address = panel.querySelector(class_address);
        		if(address){
        		    data[key].address = address.textContent.trim();
        		}else{
        		    data[key].address = false;
        		}
        		
        		var phone = panel.querySelector(class_phone);
        		if(phone){
        		    data[key].phone = phone.textContent.trim();
        		}else{
        		    data[key].phone = false;
        		}
    
        		
console.log(`Name: ${data[key].name}
Category: ${data[key].category}
Web: ${data[key].web}
Phone: ${data[key].phone}
City: ${data[key].city}
`)
        		
        		/*Connect web to aythen*/
        	}
        };
    }
    //await setLatLon(_address.lat, _address.lon, 'restautante')
    //var arr = Array.from(document.querySelector(path_list).children);
    
    //
    
    //
    //await copyTextToClipboard('text')
    console.log(JSON.stringify(data))
    
    
    
        
    //
    var keys = Object.keys(data)
    var n = keys.length
    
    var n_no_web = Object.values(data).filter(x => x.web == false)
    var n_web = n - n_no_web.length
    
    var contacts = n_no_web.map(x => x.name).join('\n')
    
console.log(`Datos:
${n} todas estas webs
${n_no_web.length} sin web
${n_web} con web

contactos potenciales:
${contacts}`)
    
    return data
}



/*

*/
var setLatLon = async (lat, lon, type = 'restaurante', zoom = 18) => {
    //set lat
    document.querySelector(path_search_input).value = lat + ' ' + lon //+ ' ' + type
    document.querySelector(path_search_input).dispatchEvent(new KeyboardEvent('keydown', { 'key': 13 }));
    await delay(1000);
    
    document.querySelector(path_search_btn).click()
    await delay(1000);

    //set zoom
    var _zoom = parseFloat(location.pathname.split('/')[4].split(',').pop().slice(0, -1))
    
    for(var i = 0; i<20; i++ ){
        document.querySelector(path_zoom_in).click()
        
        await delay(1000);
        _zoom = parseFloat(location.pathname.split('/')[4].split(',').pop().slice(0, -1))
        
        if(_zoom >= zoom) i = 99
    }
    
    //set type 
    document.querySelector(path_search_input).value = type 
    document.querySelector(path_search_input).dispatchEvent(new KeyboardEvent('keydown', { 'key': 13 }));
    await delay(1000);
    
    document.querySelector(path_search_btn).click();
    
    await delay(1000);
}

var scroll = async () => {
    await delay(2000);
    
    var selector = document.querySelector(path_list)
    if(!selector) {
        return false
    }
    
    selector.scroll({ top: selector.scrollHeight})
}





(async function(){
    //var business = await getBusiness('#city1', '#type1')
    //var business = await getBusiness(city_business, type_business) 
    //var business = await getBusiness('#city1', '#type1')
    var business = await getBusiness('sabadell ciudad', 'peluqueria') 
    
    /*connect API*/

})(window, document)


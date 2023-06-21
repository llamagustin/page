
 
/*
 * Tiene que recibir el cif sin espacios ni guiones
 */
export const validateCIF = (cif) => {
    const regexCIF = /^[ABCDEFGHJNPQRSUVW]{1}\d{8}$/;
    
    if (regexCIF.test(cif.toUpperCase())) {
        return true
    } else {
      return false
    }
}
 
/*
 * Tiene que recibir el dni sin espacios ni guiones
 * Esta funcion es llamada
 */
export const validateDNI = (dni) => {
	var lockup = 'TRWAGMYFPDXBNJZSQVHLCKE';
	var valueDni=dni.substr(0,dni.length-1);
	var letra=dni.substr(dni.length-1,1).toUpperCase();
 
	if(lockup.charAt(valueDni % 23)==letra){
		return true;
	}else{
	    return false;
	}
}


export const isID = (id) => {
    var validCIF = validateCIF(id)
    var validDNI = validateDNI(id)

    if(validCIF){
        return 'cif'
    }else if(validDNI){
        return 'dni'   
    }else{
        return false
    }
}
 
// document.write("<br>CIF: "+validateCIF("a58818501"));
// document.write("<br>DNI: "+validateDNI("38119995w"));
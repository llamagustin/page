/*
esc => vuelve a elegir una tarea
help =>
*/

const statusRules = (opt) => {
  const {
    
  } = opt
  
  return `
📌 *NORMAS DE TRABAJO - IMPORTANTE* 📌

*Inicio con los Objetivos* 💪💼
Es fundamental iniciar el turno cada día con un mensaje de bienvenida e indicando 
las tareas que se va enfocar. 

*Tiempo para Asimilar* ⏰
Dediquen 1 hora al inicio para comprender completamente los objetivos y aclarar 
cualquier duda que tengan a través de Watshapp.

*Flexibilidad Horaria* 🕐 
Pero es imprescindible estar disponible en Discord y Whatsapp para demostrar tus 
logros, tienes 1 hora libre durante el desarrollo.

*Entrega de Tareas* 📬 
Al finalizar, recuerden enviar sus entregas al correo info@aythen.com. No hacerlo 
puede conllevar una penalización.`
}





const statusInfo = (opt) => {
  const {
    
  } = opt
  
  var developer = 'Luis'
  
  return `
📌 *ACCESOS RÁPIDOS* 📌

help: Todos los ajustes de la plataforma. 
exit: Elimina la tarea asignada, como no realizada. 
esc: Vuelve atrás al inicio de la tarea. 
resume: Un resumen global de todo tu trabajo.
tasks: Un resumen de las tareas realizadas hoy.
rules: Reglas generales de Aythen. 
supervisor: Mensaje directo con el supervisor. 

📌 *ACCESOS PROMPTS* 📌

helperGPT: Entregas a diario en info@aythen.com. 
developerGPT: Programación en cualquier lenguaje. 
consultorGPT: Guía y ayuda con los objetivos.  
`
}


const statusWelcome = (opt) => {
  const {
    
  } = opt
  
  
  return `
Buenas ${developer}, 
tu turno inicia en 30 minutos, para empezar su jornada:

*A - Si estoy disponible* 📌
*B - No, voy a llegar 30 minutos tarde* 📌
*C - No, hoy no voy a poder trabajar* 📌
` 
}


/**/

const statusTasks = (opt) => {
  const {
    
  } = opt
  
  
  return `
Elige una de las siguientes tareas...
por la cuál puede empezar, si necesita más información sobre la tarea escriba info A:

*A - Tarea ejemplo 1* 📌
_Alta - Fácil - 2h_
La descripcion de la tarea uno de 200 chars.

*B - Tarea ejemplo 1* 📌
_Alta - Fácil - 2h_
La descripcion de la tarea uno de 200 chars.

*C - Tarea ejemplo 1* 📌
_Alta - Fácil - 2h_
La descripcion de la tarea uno de 200 chars.
` 
}


const statusTaskInfo = (opt) => {
  const {
    
  } = opt
  
  
  return `
Tarea: Titulo de tarea
Prioridad: Alta 
Dificultad: Fácil 
Tiempo estimado: 2h 

📌 MÁS INFORMACIÓN 📌

Aquí hay información sobre la tarea: Esta tarea se debe desarrollar la idea 
es que tenga..


Necesitas algo más de info:
A. Necesito Ayuda
B. Developer Helper
C. Tarea Terminada
` 
}


const statusTaskFinish = (opt) => {
  const {
    
  } = opt
  
  
  return `
📌 AVISO PENDIENTE 📌

Buenas empezaste la tarea *tarea 1* a las *11:10*, el tiempo estimado es de *2h*
y tiene una prioridad *alta*.

Tarea: Titulo de tarea
Prioridad: Alta 
Dificultad: Fácil 
Tiempo estimado: 2h 

Necesitamos saber el estado en el que se encuentra para seguir con el control:
A. Ya la terminaré
B. La terminaré a tiempo
C. Necesitaré 20 - 30 minutos
D. Tuvé problemas no voy a poder completarla
` 
}

/**/

const statusTaskFinish_YES = (opt) => ´{
  const {
    
  } = opt
  
  
return `
Enhorabuena por terminar la tarea, le indicaremos vamos a realizar una nueva tarea.
` 
//enviar la siguiente si da tiempo sino decirle enhorauena
}

const statusTaskFinish_NO = (opt) => ´{
  const {
    
  } = opt
  
  
return `
Lo sentimos escribenos por qué no has podido encontrarla
` 
}


const statusTaskFinish_WAIT = (opt) => ´{
  const {
    
  } = opt
  
  
return `
Esperaremos que la termine no dude en contactar si necesitas ayuda.
` 
}

/**/

const statusTaskHelperGPT = (opt) => {
  const {
    
  } = opt
  
  
  return `
Aquí tienes ayuda para generar las tarea que tienes.. con el helpergpt
` 
}


const statusTaskDeveloperGPT = (opt) => {
  const {
    
  } = opt
  
  
  return `
Aquí tienes alguien que te va ayudar a programar digame que necesitas y le creare un ejemplo
txt si neceita que haga ajustes digamelos después de cada iterración.
` 
}


const statusTaskDeveloperGPT = (opt) => {
  const {
    
  } = opt
  
  
  return `
Aquí tienes alguien que te va ayudar a programar digame que necesitas y le creare un ejemplo
txt si neceita que haga ajustes digamelos después de cada iterración.
` 
}



const responseBot = (params) => {
  var {
    tag = null,
    key = null,
    verify = false
  } = params

  if (!tag) {
    !verify ? tag = 'welcome' : tag = 'home'
  }
  
  var status = null;
  var data;

  key = key.toLowerCase().trim()

  var opt = {

  }

  switch (tag) {
    case 'balance':
      if (key == 'a') {
        // data = statusHome(opt);
        status = 'home'
      }
      break;
    case 'resume':
      if (key == 'a') {
        // data = statusHome(opt);
        status = 'home'
      }
      break;
  }

  return {
    status: status,
    message: data
  }
}

module.exports = responseBot;

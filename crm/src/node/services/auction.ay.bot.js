//
const statusNotFound = () => {
    return `
No hemos detectado ningun opción

_Escribe la opción que quiera realizar._

*A* Atrás
`
}


//
const statusBot = () => {
    return ` 
- ☎️ - *10* Resellers disponibles 
- ☎️ - *3* Intereses nuevos por reseller 
- ☎️ - *150* Interes generado semanal 
- ☎️ - *5* Impactos hasta venta 
- ☎️ - *3.000* Venta total de tickets 

- ✅ - *8€* Precio de ticket umbral  
- ✅ - *10€* Precio de venta min
- ✅ - *96€* Precio de venta max 
- ✅ - *18€* Previo de venta avg 

- 💰 - *24.000€* Objetivo mensual 
- 💰 - *54.000€* Objetivo obtenido 

_Escribe la opción que quiera realizar._

*A* Ir atrás
`
}

const statusWelcome = () => {
    return `
Bienvenido al *programa reseller*, me llamo *ayBot* y he sido creado para ofrecerte 
clientes potenciales que quieren solicitar el *Kit Digital*.

Conoces el *Kit Digital*?

_Escribe la opción que quiera realizar._

*A* Sí
*B* No
`
}

const statusInfo = () => {
    return `
El *Kit Digital* es un programa subvencionado que cualquier agente digitalizador 
puede ofrecer a sus clientes. *AyBot* te dará acceso a presupuestos de clientes desde 
*Whatsapp* para que puedas digitalizar facilmente sus negocios.

_Escribe la opción que quiera realizar._

*A* Regístrarte en el plan Reseller
*B* Precios y condiciones
`
}

const statusPrice = () => {
    return `
Aythen ayuda a los agentes digitalizadores automatizar sus ventas y 
ofrecer los 6 sentidos del *Kit Digital en 6 herramientas* desde 
nuestra web *https://aythen.com*. Descubre nuestros precios y condiciones:

*Precios*
_Cada oportunidad de venta es una acción que realiza uno de nuestros_
_reseller donde 1. Comercializa, 2. Cita , 3. Informa, 4. Tramita, 5._
_Forma y 6. Fideliza con cada cliente. Si no quieres utilizar Aythen puedes_
_recomprar el lead por su precio de mercado. Descubre nuestros precios:_

     - Desde *10.00€* Cliente potencial basico de 2.000€
     - Desde *14.00€* Cliente potencial medio de 2.000€ hasta 6.000€
     - Desde *20.00€* Cliente potencial medio de 6.000€ hasta 12.000€

_Escribe la opción que quiera realizar._

*A* Regístrarte en el plan Reseller
*B* Más información
`
}

const statusTool = () => {
    return `
Ofrecemos 6 herramientas para que cualquier pyme pueda obtener los 6 sentidos 
digitales necesarios para digitalizar su negocio, si necesitas más información 
puedes contactar con uno de nuestros agentes.

*1.* WEB | Editor colaborativo web desde 25€ por cliente
*2.* SHOP | Métodos e-ecommerce desde 25€ por cliente
*3.* SEO | Presencia online desde 25€ por cliente
*4.* RRSS | Redes automatizadas desde 25€ por cliente
*5.* CRM | Gestor de clientes desde 25€ por cliente
*6.* OFFICE | Oficina virtual desde 25€ por cliente

_Escribe la opción que quiera realizar._

*A* Regístrarte en el plan Reseller
*B* Contactar con soporte
`
}

const statusContact = () => {
    return `
Pronto un miembro de nuestro equipo de soporte contactará contigo. 

_Escribe la opción que quiera realizar._

*A* Regístrarte en el plan Reseller
*B* Salir
`
}

const statusRegister = () => {
    return `
Para registrarte en el plan reseller tienes que enviar saldo a su cuenta realiza 
una transferencia bancaria a *ES63 0182 5870 8502 0193 4162* con el saldo a recargar. 
Si has realizado ya la recarga confirmala tardamos alrededor de 24/48h para actualizar el estado.

_Escribe la opción que quiera realizar._

*A* Confirmar
*B* Salir
`
}



//
const statusHome = (opt) => {
    const {
        name = 'agente digitalizador'
    } = opt
    
    var label = `_Tiene saldo disponible_ ✅ ` 
    var label = `_No tiene saldo disponible_ ⛔`
    
    return `
Hola *${name}*, me llamo *ayBot* estoy disponible para ayudarte
a conseguir clientes con mi sistema *reseller* creado para ti.

${label}

_Escribe la opción que quiera realizar._

*A* Resumen de cuenta
*B* Ajustes
`
}

const statusSettings = (opt) => {
    const {
        name = 'agente digitalizador'
    } = opt
    
    return `
Ajustes de *${name}*

_Escribe la opción que quiera realizar._

*A* Salir
*B* Mostrar saldo
*C* Soliciar Leads | Para de recibir Leads
*D* Eliminar cuenta
`
}

const statusDelete = (opt) => {
    const {
        name = 'agente digitalizador'
    } = opt
    
    return `
Estás seguro que quieres eliminar definitivamente *${name}* del programa reseller?

_Escribe la opción que quiera realizar._

*A* Sí
*B* No
`
}

const statusBalance = (opt) => {
    const {
        name = 'agente digitalizador',
        balance = '100.50€',
        date = '02 de abril del 2023'
    } = opt
    
    return `
El saldo disponible de *${name}* es de 💰*${balance}* en ${date}. 
Agrega más con una transferencia bancaria en 📥 *ES63 0182 5870 8502 0193 4162* 
y en 24/48 horas actualizaremos su saldo.

_Escribe la opción que quiera realizar._

*A* Salir
`
}

const statusResume =  (opt) => {
    const {
        name = 'agente digitalizador',
        balance = '100.50€',
        day = 10,
        impact = 10,
        open = 10
    } = opt
    
    return `
 Resumen de la cuenta *${name}*:

- 📈 - *${day}* oportunidades recibidas cada día
- 📈 - *${impact}* impactos realizados este mes 
- 📈 - *${open}* oportunidades abiertas disponibles

- 💰 - *${balance}* de saldo disponible

_Escribe la opción que quiera realizar._

*A* Salir
`
}

const statusRecharge = (opt) => {
    return `
⛔ - *No hay saldo disponible* para comprar clientes potenciales.
💰 - Añade más saldo realizando una transferencia *ES63 0182 5870 8502 0193 4162* 

_Escribe la opción que quiera realizar._

*A* Confirmar
*B* Salir
`
}

const statusList = (opt) => {
    const {
        name = 'agente digitalizador',
        email = 'ejemplo@gmail.com',
        leads = 16
    } = opt
    
    return `
Hemos recibido correctamente su solicitud para obtener *el listado completo de 
las *${leads}* oportunidades disponibles que tiene *${name}*. Le enviaremos 
el listado correo *${email}* en menos de 24/48 horas.

_Escribe la opción que quiera realizar._

*A* Ajustes
*B* Resumen de cuenta
*C* Salir
`
}

const statusAuction = (opt) => {
    const {
        name = 'agente digitalizador',
        business = 'ITBC GROUP TECNOLOGIA SPAIN SL',
        province = '',
        bet = '12.00€',
        offer = '12.000€',
        percent = 10,
        services = [],
        impact = 0,
        works = 0,
        offers = 0
    } = opt
    
    var _percent = percent/100 + '%'
    var tools = 'web, shop, seo, rrss office y crm' 
    
    return `
Enhorabuena , *${name}* has recibido una nueva oportunidad de venta para 
*${business}* en *${province}* que tiene *${works}* empleados y *${offers}* ofertas 
necesita ${tools}. 

Este contacto tiene *${impact}* impactos tiene un *${_percent}* de posibilidades de éxito, puedes 
obtener hasta *${offer}* que desea hacer:

_Escribe la opción que quiera realizar._

*A* Impactar en la oportunidad de venta por *${bet}* 📞
*B* Compra excluvisa de oportunidad de venta por *${bet}* 💰
*C* Rechazar oportunidad de venta e ir a la siguiente ⛔
`
}


const statusBid = (opt) => {
    const {
        name = 'agente digitalizador',
        business = 'ITBC GROUP TECNOLOGIA SPAIN SL',
        impact = 10
    } = opt
    
    return `
Has invertido en realizar el *${impact}* impacto a *${business}*. Actualizaremos al siguiente lead disponible.

_Escribe la opción que quiera realizar._

*A* Siguiente 
*B* Atrás
`
}

const statusBuy = (opt) => {
    const {
        name = 'agente digitalizador',
        business = 'ITBC GROUP TECNOLOGIA SPAIN SL',
        impact = 10
    } = opt
    
    return `
Has comprado los datos de *${business}*.
Te enviaremos un correo en 24/48 con los datos actualiados y dejaremos de realizar un seguimiento por
nuestra parte.

_Escribe la opción que quiera realizar._

*A* Siguiente 
*B* Atrás
`
}

const statusRechazar = (opt) => {
    const {
        name = 'agente digitalizador',
        business = 'ITBC GROUP TECNOLOGIA SPAIN SL',
        impact = 10
    } = opt
    
    return `
Has rechazado a *${business}*. Lo lamentamos, esperemos que tengas más suerte en el siguiente.

_Escribe la opción que quiera realizar._

*A* Siguiente 
*B* Atrás
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
  // var data; //message
  //  =>> saber cuando se le enviara el siguiente lead
  //  =>>
  //  x vendrá de la categoria 2.000€ 6.000€ 12.000€, de n impacto, m servicios, cerca?
  //  =>>
  // subastar contactos realizados a los usuarios a través de resellers
  // action => tag
  // accounts
  // users notification (price)
  // cancel
  //     unfollow user notifici action
  // buy 
  //     follow user notification action
  //     balanace x
  
  var status = null;
  var data;

  key = key.toLowerCase().trim()

  if (!(key === 'a' || key === 'b' || key === 'c' || key === 'd')) {
    data = statusNotFound();
    status = 'notfound'
  }
  else {
    if (verify == 'manage') {
      data = statusBot();
      if (key == 'a') {
        status = 'home';
      }

      if (!status) {
        data = statusNotFound()
        status = 'notfound'
      }
    }
    else if (!verify) {
      switch (tag) {
        case 'notfound':
          if (key == 'a') {
            data = statusWelcome();
            status = 'welcome'
          }
          break;
        case 'welcome':
          if (key == 'a') {
            data = statusPrice();
            status = 'price'
          }
          else if (key == 'b') {
            data = statusInfo();
            status = 'info';
          }
          break;
        case 'info':
          if (key == 'a') {
            data = statusRegister();
            status = 'register'
          }
          else if (key == 'b') {
            data = statusPrice();
            status = 'price';
          }
          break;
        case 'price':
          if (key == 'a') {
            data = statusRegister();
            status = 'register'
          }
          else if (key == 'b') {
            data = statusTool();
            status = 'tool';
          }
          break;
        case 'tool':
          if (key == 'a') {
            data = statusRegister();
            status = 'register'
          }
          else if (key == 'b') {
            console.log('contact soporte')
            data = statusContact();
            status = 'contact';
          }
          break;
        case 'contact':
          if (key == 'a') {
            data = statusRegister();
            status = 'register'
          }
          else if (key == 'b') {
            data = statusWelcome();
            status = 'welcome';
          }
          break;
        case 'register':
          data = statusRegister();
          if (key == 'a') {
            console.log('confirm')
            if (false) {
              data = statusHome();
              status = 'confirm'
            }
            else {
              data = statusRecharge();
              status = 'recharge'
            }
          }
          else if (key == 'b') {
            data = statusWelcome();
            status = 'welcome';
          }
          break;
        case 'recharge':
          if (key == 'a') {
            console.log('confirm')
            if (false) {
              data = statusWelcome(opt);
              status = 'welcome'
            }
            else {
              data = statusRecharge(opt);
              status = 'recharge'
            }
          }
          else if (key == 'b') {
            data = statusWelcome(opt);
            status = 'welcome';
          }
          break;
      }

      if (!status) {
        data = statusNotFound()
        status = 'notfound'
      }
    }
    else {
      var opt = {

      }

      switch (tag) {
        case 'notfound':
          if (key == 'a') {
            data = statusHome(opt);
            status = 'home'
          }
          break;
        case 'home':
          if (key == 'a') {
            data = statusResume(opt);
            status = 'resume'
          }
          else if (key == 'b') {
            data = statusSettings(opt);
            status = 'settings';
          }
          break;
        case 'settings':
          if (key == 'a') {
            data = statusHome(opt);
            status = 'home'
          }
          else if (key == 'b') {
            data = statusBalance(opt);
            status = 'balance';
          }
          else if (key == 'c') {
            console.log('solicitar')
            data = statusHome(opt);
            status = 'home';
          }
          else if (key == 'd') {
            data = statusDelete(opt);
            status = 'delete';
          }
          break;
        case 'delete':
          if (key == 'a') {
            console.log('confirm logico')
            data = statusDelete(opt);
            status = 'delete'
          }
          else if (key == 'b') {
            data = statusHome(opt);
            status = 'home';
          }
          break;
        case 'balance':
          if (key == 'a') {
            data = statusHome(opt);
            status = 'home'
          }
          break;
        case 'resume':
          if (key == 'a') {
            data = statusHome(opt);
            status = 'home'
          }
          break;
        case 'recharge':
          if (key == 'a') {
            console.log('confirm')
            if (false) {
              data = statusHome(opt);
              status = 'home'
            }
            else {
              data = statusRecharge(opt);
              status = 'recharge'
            }
          }
          else if (key == 'b') {
            data = statusHome(opt);
            status = 'home';
          }
          break;
        case 'list':

          console.log('send list')
          if (key == 'a') {
            data = statusSettings(opt);
            status = 'settings'
          }
          else if (key == 'b') {
            data = statusResume(opt);
            status = 'resume';
          }
          else if (key == 'c') {
            data = statusHome(opt);
            status = 'home';
          }
          break;
        case 'auction':
          if (key == 'a') {
            console.log('bid')
            data = statusBid(opt);
            status = 'home'
          }
          else if (key == 'b') {
            console.log('buy')
            data = statusBuy(opt);
            status = 'home';
          }
          else if (key == 'c') {
            console.log('rechazar')
            data = statusRechazar(opt);
            status = 'home';
          }
          break;
      }

      if (!status) {
        data = statusNotFound()
        status = 'notfound'
      }

      // data = statusAuction(opt)
    }

  }

  return {
    status: status,
    message: data
  }
}

module.exports = responseBot;




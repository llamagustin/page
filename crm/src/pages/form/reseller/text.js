import { PhAddressBook, PhHeart, PhUsers } from "phosphor-vue";
import { shallowRef } from "vue";

export const textForm01 = {
  title: "Selecciona tu situación actua✨",
  text: `Todas las opciones están disponibles, escoge la que más te interese.`,
  qq: [
    {
      title: "Tengo una caretera de clientes.💼",
      text: "Quiero adaptarla al CRM de gestión comercial Aythen",
      value: "web",
    }, {
      title: `Me dedicaré 24/7 a Aythen 🏆.`,
      text: "Será mi prioridad para potenciar mi zona.",
      value: "seo+sem",
    },
    {
      title: `Quiero recibir nuevos leads cada mes.🧭`,
      text: "Me centraré en los objetivos para ser constante",
      value: "ecommerce",
    },
    {
      title: `Venderé de forma esporadica.`,
      text: "Lo compagino con otros trabajos o tareas.",
      value: "marketplace",
    },
   
    {
      title: `No tengo experiencia en ventas`,
      text: "Pero quiero aprender para asesorar e informar",
      value: "crm",
    },
  ],
  button: ["Atrás", "Siguiente paso"],
};

export const textForm02 = {
  title: "¿Conoces el Kit Digital? ✨",
  text: `Tenemos diferentes pasos de verificación para formar y ayudar a nuestros resellers de forma clara. Esto nos permite asegurarnos el correcto asesoramiento de las subveciones hacia los clientes potenciales.`,
  step: [
    {
      title: "No, no lo conozco🗒️.",
      text: `No te preocupes, te informaremos de todo lo necesario para asesorar al cliente final de forma profesional.`,
      value: 1,
    },
    {
      title: "Si, lo conozco 📝",
      text: `Perfecto, de todas maneras te enviaremos documentación para repasar conceptos y tenerlos en cuenta.`,
      value: 2,
    },
    {
      title: "Si, pero quiero más información",
      text: `Sin problema, te ofrecemos los webinars para entenderlo mejor`,
      value: 3,
    },
  ],
  label: {
    title: "💸 Subvencionado a fondo perdido por la UE",
    text: `Financiación de nuestros servicios durante un año para digitalizar cualquier tipo de negocio.`,
  },
  button: ["Atrás", "Siguiente paso"],
};

export const textForm03 = {
  title: "¿Eres autonónomo?✨",
  text: `Para ser reseller debes estar de alta en la seguridad social para poder recibir las comisiones sin ningún problema.`,
  step: [
    {
      title: "Sí, actualmente soy autónomo",
      text: `Aythen está buscando candidatos como tú para ofrecer el producto.`,
      value: "segment-one",
      icon: shallowRef(PhHeart),
    },
    {
      title: "No, pero podría serlo",
      text: `Genial, te informamos sobre los pasos a seguir.`,
      value: "segment-two",
      icon: shallowRef(PhUsers),
    },
    {
      title: "No quiero ser autónomo",
      text: `No te preocupes, puedes cotizar proporcionalmente a tus ingresos, te informaremos.`,
      value: "segment-tree",
      icon: shallowRef(PhAddressBook),
    },
  ],
  label: {
    title: "💸 Ser autónomo no es necesario en Aythen",
    text: `Infórmate sobre cómo cotizar gracias a las nuevas cuotas de autónomos según tu nivel de facturación.`,
  },
  button: ["Atrás", "Siguiente paso"],
};

export const textForm04 = {
  title_0: "Regístrate para acceder ✨",
  text_0: `Empecemos con tus datos y tu zona de interés para ser reseller.`,
  title_1: "¿En qué zona estarías interesado trabajar? ✨",
  text_1: `Trabajamos a nivel nacional para cubrir todas las zonas posibles.`,
  label: {
    fullName: "Tu nombre completo",
    email: "Email",
    phone: "Teléfono",
    company: "Compañía",
    province: "Provincia",
    country: "País",
    city: "Ciudad",
    streetAddress: "Dirección",
    postalCode: "Código Postal",
  },
  button: ["Atrás", "Siguiente paso"],
};

export const textForm06 = {
  title: "Cita previa",
  text: `En este calendario vas a poder agendar el día en que te gustaría empezar. Esta misma fecha haremos una llamada de bienvenida para poder resolver cualquier duda.`,
  label: {
    title: "Elige la fecha concreta ✨",
    text: "De esta forma, podemos preparar tu zona con los Leads potenciales.",
  },
  button: ["Atrás", "Siguiente paso"],
};

export const textForm07 = {
  title: "Encantados de tenerte, bienvenid@ a Aythen 🙌",
  text: `Gracias por formar parte de nuestro proyecto. Nuestros valores son flexibilidad y eficacia. 
    Para cualquier duda nos tendrás disponibles tanto por correo como Whatsapp.`,
  button: ["Enviar Solicitud"],
};

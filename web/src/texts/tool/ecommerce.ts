import type { BaseFeature, SimpleIconFeature } from '/@src/types'

/*
export const textHeroS = {
    title: [
        "Vende productos y servicios ", 
        "fácilmente",
        "por ti mismo"
    ],
    text: `Productos, servicios, reservas. Nunca había
              sido tan sencillo, rápido y seguro.`,
    button_0: "Kit Digital",
    button_1: "Demo"
}
*/







export const textB = {
  title: 'Acepta pagos',
  subtitle: 'Impulsa tu negocio',
  content:
    'Obtén la estructura lista para empezar a vender online, subir fotos, descripciones, pedidos, envíos, etc.',
}

export const salesFeatures: SimpleIconFeature[] = [
  {
    title: 'Vende productos',
    text: 'Los límites los pones tú. Envia, sigue y controla todo lo relativo a tu tienda digital.',
    icon: 'ion:storefront-outline',
  },
  {
    title: 'Vende servicios',
    text: 'Vende tu estancia, tu cita, tu experiencia. Lo que necesites para crear y fidelizar.',
    icon: 'ion:save-outline',
  },
  {
    title: 'Vende arte',
    text: 'A través de distintas categorias organiza tu catálogo y demuestra todo tu potencial.',
    icon: 'ion:brush-outline',
  },
  {
    title: 'Véndete',
    text: 'La mejor manera de enseñar quién eres, es vendiéndote con tu tienda online.',
    icon: 'ion:calendar-outline',
  },
]

export const textC = {
  title: 'Lista tus productos',
  subtitle: 'Crece tu negocio',
  content:
    'Integra métodos de pago online para generar más beneficios de tu proyecto dentro de internet y hacer un hueco para tus productos/servicios.',
}

export const growthFeatures: SimpleIconFeature[] = [
  {
    title: 'Clientes',
    text: 'Ten acceso a todos tus contactos para recordatorios, promociones, newsletters, etc.',
    icon: 'ion:mail-unread-outline',
  },
  {
    title: 'Brilla como sabes',
    text: 'Tu tienda te define, enseña lo que ofreces y dale a tus clientes acceso al catálogo.',
    icon: 'ion:sparkles-outline',
  },
  {
    title: 'Fidelízalos',
    text: 'La tienda online te permite fidelizar y tener control de tu histórico de pedios.',
    icon: 'ion:magnet-outline',
  },
  {
    title: 'Códigos promocionales',
    text: 'Crea promociones según tus márgenes y dale una alegría a tus potenciales clientes.',
    icon: 'ion:gift-outline',
  },
]

export const textTestimonials = {
  title: 'El acceso a tu negocio',
  subtitle: '¡Únete a nuestra red!',
  content: `Nos gusta dar lo mejor de nosotros para que estés contento con nuestro servicio.
          Consideramos el soporte como vital para la mejora y el aprendizaje.
          `,
}

export const textF = {
  title: 'Tómate tu tiempo para leerlas',
  subtitle: 'Preguntas frecuentes',
}

export const textE = {
  title: 'Estamos aquí para ayudar',
  subtitle: 'Soporte para tu negocio',
  content: `Asesoramos y formamos para que puedas decidir lo que te interese.`,
}

export const managementFeatures: SimpleIconFeature[] = [
  {
    title: 'Todo en uno',
    text: 'Somos un portal de acceso a nuestras herramientas y de terceros.',
    icon: 'ion:construct-outline',
  },
  {
    title: 'Servidores',
    text: 'Para poder tener acceso en cualquier momento, tus datos están en la nube.',
    icon: 'ion:speedometer-outline',
  },
  {
    title: 'Facturación',
    text: 'Tendrás acceso a tus pedidos, seguimiento y facturas.',
    icon: 'ion:reader-outline',
  },
  {
    title: 'Impuestos',
    text: 'Dispondrás de diferentes opciones de IVA para tus diferentes carteras de clientes.',
    icon: 'ion:document-attach-outline',
  },
]

export const textSignUp = {
  title: 'Contacta nos nosotros',
  subtitle: `Si tienes dudas, te podemos ayudar.`,
  logosText: 'Sin compromiso, sin papeleos',
  button: [
    {
      label: '+34 631 83 13 83',
      link: 'https://api.whatsapp.com/send?text=Hello%20Whatsapp&phone=%2B34%20631%2083%2013%2083',
    },
    {
      label: '¡ Solicitar ya !',
      link: 'https://mail.google.com/mail/?view=cm&fs=1&to=info@aythen.com&su=Aythen contacto&body=Quiero más información sobre el Kit Digital.',
    },
  ],
}

export const posts = [
  {
    id: 0,
    image: '/assets/illustrations/blog/commerce-1.svg',
    title: 'Increase conversion rates and learn how to manage abandonned carts',
    likes: '112',
    categories: [
      {
        name: 'Commerce',
      },
      {
        name: 'Conversion',
      },
      {
        name: 'Profit',
      },
    ],
    date: 'March 17th, 2022',
    duration: 2,
  },
  {
    id: 1,
    image: '/assets/illustrations/blog/commerce-2.svg',
    title: 'How order bumps can help increasing your revenue and conversions',
    likes: '319',
    categories: [
      {
        name: 'Orders',
      },
      {
        name: 'Checkout',
      },
      {
        name: 'Conversion',
      },
    ],
    date: 'March 17th, 2022',
    duration: 2,
  },
  {
    id: 2,
    image: '/assets/illustrations/blog/commerce-3.svg',
    title: 'How a rich and well maintained catalogue easily converts customers',
    likes: '519',
    categories: [
      {
        name: 'Conversion',
      },
      {
        name: 'Sales',
      },
      {
        name: 'Products',
      },
    ],
    date: 'March 17th, 2022',
    duration: 2,
  },
]

export const faq = {
  left: [
    {
      title: '¿Cuántos productos puedo subir?',
      content:
        'Depende de tu plan tendrás acceso a determinadas estructuras de tienda online. Empezando por 10 hasta 500 productos. Si quieres más, no pasa nada, contáctanos para estudiar tu caso y tus necesidades.',
    },
    {
      title: '¿Voy a vender más?',
      content:
        'Nosotros te proveemos de la estructura donde categorizar, explicar, contabilizar, enviar y más, todos tus productos o servicios. Vender más o menos dependerá de ti y campañas publicitarias complementarias.',
    },
    {
      title: '¿Cómo gestiono la eCommerce?',
      content:
        'La tienda online se divide en dos partes, la visual que se expone para tus clientes y tu administrador. En él tendrás un menú donde ver notificaciones, pedidos, envíos, seguimiento, productos, etc.',
    },
  ],
  right: [
    {
      title: '¿Cómo funciona?',
      content:
        'Muy fácil, solo tendrás que entrar en www.aythen.com y registrarte para tener acceso a tu cuenta. Desde allí controlarás tu panel para gestionar toda tu estructura y catálogo.',
    },
    {
      title: '¿Lo puedo tener gratis?',
      content:
        'Si no tienes tienda online, ¡SÍ! Gracias al Kit Digital financiamos esta estructura para que puedas aceptar pagos y vender online.',
    },
    {
      title: '¿Cómo lo puedo solicitar?',
      content:
        'Aprieta el botón "Solicitar" y te redirige a un formulario online para conocerte mejor y asesosarte con más precisión para la subvención. Si quieres también puedes ir a la calculadora para comparar y comprar tu plan.',
    },
  ],
}





export const testimonials = [
  {
    content:
      'Construí mi ecommerce con la ayuda del Kit Digital ahora vendo todos mis productos desde cualquier sitio.',
    avatar: '/assets/demo/img/person/berta-ecommerce.jfif',
    name: 'Berta Muriel',
    position: '@berta',
    logo: '/assets/brands/infinite.svg',
  },
  {
    content:
      'Ahora ofrezco mis servicios a través de Internet gracias a la facilidad con la que integre el Kit Digital.',
    avatar: '/assets/demo/img/person/minerva-ecommerce.jfif',
    name: 'Minerva Canovas',
    position: '@minerva',
    logo: '/assets/brands/proactive.svg',
  },
  {
    content:
      'Con el Kit Digital puedo administrar la gestión de mis pedidos y ventas en mi ecommerce siempre que lo necesite.',
    avatar: '/assets/demo/img/person/angelica-ecommerce.jfif',
    name: 'Angel Fernández',
    position: '@angelica',
    logo: '/assets/brands/tribe.svg',
  },
  {
    content:
      'Pude tener una ecommerce que me encanta gracias al Kit Digital y Aythen. Ahora puedo vender de forma más ágil a mis clientes.',
    avatar: '/assets/demo/img/person/iban-ecommerce.jfif',
    name: 'Ivan Buendia',
    position: '@ivan',
    logo: '/assets/brands/kromo.svg',
  },
]
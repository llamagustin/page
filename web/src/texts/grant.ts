export const textHome = {
  title: 'Desde 100€ hasta 2.000€ por servicio',
  //subtitle: 'Financiado por la Unión Europea',
  subtitle: 'Descubre nuestros planes',
  text: `Realiza nuestro formulario online para empezar a tramitar tu servicio y/o subvención. Aythen se encarga de todo el proceso.`,
}

export const textPlans = {
  benefits: 'Beneficios',
  features: 'Características',
  button: 'Solicítala aquí',
  link: 'https://reseller.aythen.com/form/lead',
}

export const plans = [
  {
    id: 0,
    icon: 'ph:pencil',
    iconColor: '#0000ff',
    title: 'Web',
    subtitle: 'Sitio web',
    resume: `Expansión de la presencia en internet de la PYME mediante la creación de una página web y/o la prestación de servicios que proporcionen posicionamiento básico en internet.`,
    price: {
      bronze: 500,
      silver: 2000,
      gold: 6000
    },
    benefits: {
      bronze: [
        {
          id: 0,
          content: '1 servicio incluído',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 50h',
        },
      ],
      silver: [
        {
          id: 0,
          content: '1 servicio incluído',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 50h',
        },
      ],
      gold: [
        {
          id: 0,
          content: '1 servicio incluído',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 50h',
        },
      ],
    },
    features: [
        {
          id: 0,
          content: '1 año mantenimiento incluído',
        },
        {
          id: 1,
          content: 'Tutoriales disponibles',
        },
        {
          id: 2,
          content: 'Facturación desgravable',
        },
        {
          id: 3,
          content: '100€ mantenimiento anual',
        },
      ]
  },
  {
    id: 1,
    icon: 'ph:storefront',
    iconColor: '#13d33b',
    title: 'E-commerce',
    subtitle: 'Tienda online',
    resume: `Creación de una tienda online de compraventa de productos y/o servicios que utilice medios digitales para su intercambio.`,
    price: {
      bronze: 500,
      silver: 2000,
      gold: 6000
    },
    benefits: {
      bronze: [
        {
          id: 0,
          content: 'Varios servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 70h',
        }
      ],
      silver: [
        {
          id: 0,
          content: '1-3 servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 70h',
        }  
      ],
      gold: [
        {
          id: 0,
          content: '1-3 servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 70h',
        }  
      ]
    },
    features: [
        {
          id: 0,
          content: '1 año mantenimiento incluído',
        },
        {
          id: 1,
          content: 'Tutoriales y asesoramiento',
        },
        {
          id: 2,
          content: 'Facturación a 60 días',
        },
        {
          id: 3,
          content: '250€/año mantenimiento',
        },
      ]
  },
  {
    id: 2,
    icon: 'ph:funnel',
    iconColor: '#fff343',
    title: 'SEO',
    subtitle: 'Presencia avanzada',
    resume: `Aumento del alcance de potenciales clientes e incrementando el tráfico de visitas en su/-s plataforma/-s.`,
    price: {
      bronze: 500,
      silver: 2000,
      gold: 6000
    },
    benefits: {
      bronze: [
        {
          id: 0,
          content: 'Varios servicios disponibles',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
      silver: [
        {
          id: 0,
          content: '1-6 servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
      gold: [
        {
          id: 0,
          content: '1-6 servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
    },
    features: [
        {
          id: 0,
          content: '1 año mantenimiento incluído',
        },
        {
          id: 1,
          content: 'Tutoriales y asesoramiento',
        },
        {
          id: 2,
          content: 'Facturación a 60 días',
        },
        {
          id: 3,
          content: '250€/año mantenimiento',
        },
      ]
  },
  {
    id: 3,
    icon: 'ph:chat-circle',
    iconColor: '#fff343',
    title: 'Redes Sociales',
    subtitle: 'Redes Sociales ',
    resume: `Promociona tus redes sociales con herramientas automaziadas para gestionar, monitorizar y analizar tus posts, interacciones y estrategias.`,
    price: {
      bronze: 500,
      silver: 2000,
      gold: 6000
    },
    benefits: {
      bronze: [
        {
          id: 0,
          content: 'Varios servicios disponibles',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
      silver: [
        {
          id: 0,
          content: '1-6 servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
      gold: [
        {
          id: 0,
          content: '1-6 servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
    },
    features: [
        {
          id: 0,
          content: '1 año mantenimiento incluído',
        },
        {
          id: 1,
          content: 'Tutoriales y asesoramiento',
        },
        {
          id: 2,
          content: 'Facturación a 60 días',
        },
        {
          id: 3,
          content: '250€/año mantenimiento',
        },
      ]
  },
  {
    id: 5,
    icon: 'ph:users',
    iconColor: '#ffa726',
    tag: 'crm',
    title: 'CRM',
    subtitle: 'Gestión de Clientes',
    resume: `Digitaliza y optimiza la gestión de las relaciones comerciales con los clientes, desde la creación hasta la fidelización.`,
    price: {
      bronze: 500,
      silver: 2000,
      gold: 6000
    },
    benefits: {
      bronze: [
        {
          id: 0,
          content: 'Varios servicios disponibles',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
      silver: [
        {
          id: 0,
          content: '1-6 servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
      gold: [
        {
          id: 0,
          content: '1-6 servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
    },
    features: [
        {
          id: 0,
          content: '1 año mantenimiento incluído',
        },
        {
          id: 1,
          content: 'Tutoriales y asesoramiento',
        },
        {
          id: 2,
          content: 'Facturación a 30 días',
        },
        {
          id: 3,
          content: '250€/año mantenimiento',
        },
      ]
  },
  {
    id: 5,
    icon: 'ph:headset',
    iconColor: '#d216ff',
    tag: 'office',
    title: 'Oficina Virtual',
    subtitle: 'Oficina Virtual',
    resume: `Implantar soluciones interactivas y funcionales que permitan la colaboración más eficiente entre los trabajadores de las empresas beneficiarias.`,
    price: {
      bronze: 500,
      silver: 2000,
      gold: 6000
    },
    benefits: {
      bronze: [
        {
          id: 0,
          content: 'Varios servicios disponibles',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
      silver: [
        {
          id: 0,
          content: '1-6 servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
      gold: [
        {
          id: 0,
          content: '1-6 servicios incluídos',
        },
        {
          id: 1,
          content: 'Entrega en 3 meses',
        },
        {
          id: 2,
          content: 'Personalizado',
        },
        {
          id: 3,
          content: 'Soporte 100h',
        },
      ],
    },
    features: [
        {
          id: 0,
          content: '1 año mantenimiento incluído',
        },
        {
          id: 1,
          content: 'Tutoriales y asesoramiento',
        },
        {
          id: 2,
          content: 'Facturación a 60 días',
        },
        {
          id: 3,
          content: '250€/año mantenimiento',
        },
      ]
  },
]

export const textA = {
  subtitle: 'Vísteme despacio que tengo prisa',
  title: 'La tramitación de la ayuda puede suponer paciencia.',
  content: `Es posible que se aprueben total o parcialmente en función de la situación de cada negocio, por ello siempre hablamos DESDE y HASTA.`,
  cta: 'Solicitar ahora',
  to: 'https://reseller.aythen.com/form/lead',
  title_bottom: 'IMPULSAMOS RESULTADOS PARA EMPRENDEDORES',
}

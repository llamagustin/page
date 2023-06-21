export const services = [
  {
    to: '/tool/web',
    toPDF: 'https://drive.google.com/file/d/1l3bayUhgUX2l7R9fD-CLMYIKyjKCRrdx/view?usp=share_link',
    icon: 'ph:pencil',
    iconColor: '#0000ff',
    tag: 'web',
    title: 'Web',
    subtitle: 'Sitio web',
    image: '/src/assets/images/app/web.png',
    resume: `Destinada a la presencia en internet de la PYME mediante la creación de una página web y/o la prestación de servicios relacionados.`,
    cost: {
      bronze: 100,
      silver: 500,
      gold: 2000
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
    boe: [{
      title: 'Dominio',
      content: 'Registro del nombre del negocio, en caso de que no disponga de uno.'
    },{
      title: 'Hosting',
      content: 'Alojamiento de la página web para el funcionamiento de la misma.'
    },{
      title: 'Diseño web',
      content: 'Estructura web con un mínimo de tres páginas o apartados a medida.'
    },{
      title: 'Responsive',
      content: 'Deben adaptarse para ser funcionales en cualquier dispositivos.'
    },{
      title: 'Accesibilidad',
      content: 'Criterios de conformidad de nivel AA de las Pautas WCAG-2.1.'
    },{
      title: 'Autogestionable',
      content:'Se deberá proveer una plataforma autónoma a la hora de modificar.'
    },{
      title: 'Posicionamiento básico',
      content: 'Posicionamiento de la información básica del negocio, contacto y perfil.'
    },{
      title: 'Idiomas',
      content: 'Página web preparada y traducida a un idioma, además del castellano.'
    }],
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
          content: '3 planes disponibles',
        },
      ]
  },
  {
    to: '/tool/ecommerce',
    toPDF: 'https://drive.google.com/file/d/1pkfBoBf9PMyglcSAw1Jjuh3DYlaH0Ys9/view?usp=share_link',
    icon: 'ph:storefront',
    iconColor: '#13d33b',
    tag: 'ecommerce',
    title: 'E-commerce',
    subtitle: 'Tienda online',
    image: '/src/assets/images/app/ecommerce.png',
    resume: `Creación de una tienda online de compraventa de productos y/o servicios para poder expandirse y llegar a más público a través de diferentes métodos de pago.`,
    cost: {
      bronze: 100,
      silver: 500,
      gold: 2000
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
    boe:  [{
      title: 'Creación y alta',
      content: 'Creación de tienda online y alta del catálogo de productos.'
    },{
      title: 'Métodos de pago',
      content: 'Configuración e integración de los métodos de pago.'
    },{
      title: 'Diseño responsive',
      content: 'Debe adaptarse para ser funcional en todo tipo de dispositivos.'
    },{
      title: 'Formas de envío',
      content: 'Configuración e integración de métodos de envío digital y físico.'
    },{
      title: 'Accesibilidad',
      content: 'Criterios de conformidad de nivel AA de las Pautas WCAG-2.1.'
    },{
      title: 'Autogestionable',
      content:'Se deberá proveer una plataforma autónoma a la hora de modificar.'
    },{
      title: 'Posicionamiento básico',
      content: 'Posicionamiento de la información básica del negocio.'
    },{
      title: 'Optimización básica',
      content: 'Análisis de palabras clave, SEO On-Page de dos páginas del contenido.'
    }],
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
    to: '/tool/seo+sem',
    toPDF: 'https://drive.google.com/file/d/1EB02Z9cZMAL9WKl7Jw7CquwzSHdTRK9F/view?usp=share_link',
    icon: 'ph:funnel',
    iconColor: '#f7e06f',
    tag: 'seo',
    title: 'SEO',
    subtitle: 'Presencia avanzada',
    image: '/src/assets/images/app/seo.png',
    resume: `Destinado al aumento del alcance de potenciales clientes incrementando el tráfico de visitas en las plataformas de interés.`,
    cost: {
      bronze: 100,
      silver: 500,
      gold: 2000
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
    boe: [{
      title: 'Motores de búsqueda',
      content: 'Mejorar los datos para los distintos canales de búsqueda.'
    },{
      title: 'Palabras clave',
      content: 'Gestión, búsqueda y análisis para desarrollar estrategias útiles.'
    },{
      title: 'Competencia',
      content: 'Análisis de la competencia para informar de la situación del mercado.'
    },{
      title: 'SEO On-page',
      content: 'Optimizar la estructura y el contenido interno.'
    },{
      title: 'SEO Off-page',
      content: 'Ejecución de acciones fuera del entorno del sitio web.'
    },{
      title: 'Informes',
      content:'Reportar el resultado de las acciones ejecutadas para analizar la evolución.'
    },{
      title: 'Tests',
      content:'Comprueba si tu página y sus partes funcionan correctamente.'
    },{
      title: 'Contenido',
      content:'Analiza el contenido de tu página web para comprobar tu estrategia.'
    }],
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
    to: '/tool/rrss',
    toPDF: 'https://drive.google.com/file/d/1OAWlT7LoTdrHOR1wn7-AwtrvEdCdvLBn/view?usp=share_link',
    icon: 'ph:chat-circle',
    iconColor: '#d21643',
    tag: 'social',
    title: 'Redes Sociales',
    subtitle: 'Redes Sociales ',
    image: '/src/assets/images/app/rrss.png',
    resume: `Promociona tus redes sociales con herramientas automaziadas para gestionar, monitorizar y analizar tus posts de manera simple y eficaz.`,
    cost: {
      bronze: 100,
      silver: 500,
      gold: 2000
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
    boe: [{
      title: 'Social Media Plan',
      content: 'Definición e implementación de una estrategia de redes sociales.'
    },{
      title: 'Monitorización',
      content: 'Control periódico a través de métricas del impacto.'
    },{
      title: 'Optimización/Auditoría',
      content: 'Análisis de los diferentes canales sociales para poder optimizar.'
    },{
      title: 'Gestión de una red social',
      content: 'Administración del perfil/usuario de la pyme en, al menos, una red social.'
    },{
      title: 'Posts semanales',
      content: 'Un mínimo de 4-8 entradas (posts) mensuales para generar tráfico.'
    },{
      title: 'Seguro y fácil',
      content:'Un solo punto de acceso seguro para tus distintas redes sociales.'
    },{
      title: 'Automatiza',
      content:'Tus publicaciones para ahorrar tiempo y generar impactos.'
    },{
      title: 'Estrategias',
      content:'Ten los datos listos para crear estrategias para tus intereses.'
    }],
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
    to: '/tool/office',
    toPDF: 'https://drive.google.com/file/d/1SDrFdZTnypMxuxzngjz8rDkk0tx4uUBD/view?usp=share_link',
    icon: 'ph:headset',
    iconColor: '#d216ff',
    tag: 'office',
    title: 'Oficina Virtual',
    subtitle: 'Oficina Virtual',
    image: '/src/assets/images/app/office.png',
    resume: `Destinado a implantar soluciones interactivas y funcionales que permitan la colaboración más eficiente entre los trabajadores de las empresas.`,
    cost: {
      bronze: 100,
      silver: 500,
      gold: 2000
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
    boe: [{
      title: 'Equipos de trabajo',
      content: 'Gestión ágil y eficiente para el desarrollo de proyectos.'
    },{
      title: 'Compatibilidad',
      content: 'Con dispositivos móviles y a cualquier navegador.'
    },{
      title: 'Almacenamiento',
      content: 'La solución proporcionará un almacenamiento de al menos 1 TB.'
    },{
      title: 'Calendario y agenda',
      content: 'Permite organizar con un calendario para las tareas previstas.'
    },{
      title: 'Organiza',
      content:'Todas las tareas a realizar pen listas de tareas y en diferentes proyectos.'
    },{
      title: 'Roles',
      content:'Gestiona tu equipo y asigna roles para las distintas resposnabilidades.'
    },{
      title: 'Completa o revisa',
      content:'Actualiza el estado de las tareas y contacta a través del chat.'
    },{
      title: 'Estipula tiempos',
      content:'Controla con tiempo para una mejor organización grupal.'
    }],
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
    to: '/tool/crm',
    toPDF: 'https://drive.google.com/file/d/1e-xJkLaUGb5XA9QMihF3j0kAiNcrT9Qb/view?usp=share_link',
    icon: 'ph:users',
    iconColor: '#ffa726',
    tag: 'crm',
    title: 'CRM',
    subtitle: 'Gestión de Clientes',
    image: '/src/assets/images/app/crm.png',
    resume: `Digitaliza y optimiza la gestión de las relaciones comerciales con los clientes, desde la creación hasta la fidelización.`,
    cost: {
      bronze: 100,
      silver: 500,
      gold: 2000
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
    boe: [{
      title: 'Gestión de clientes',
      content: 'Almacena y permite la consulta de datos de cada cliente desde su alta.'
    },{
      title: 'Clientes potenciales',
      content: 'Alta de nuevos Leads. De manera manual o mediante una importación.'
    },{
      title: 'Oportunidades',
      content: 'Envío al cliente potencial o Lead de ofertas y presupuestos.'
    },{
      title: 'Acciones comerciales',
      content: 'Crear acciones y tareas comerciales, tanto manual como automática.'
    },{
      title: 'Reporting y seguimiento',
      content: 'Indicadores para el seguimiento y monitorización de la actividad.'
    },{
      title: 'Notificaciones',
      content:'Visualizar alertas de clientes en formato gráfico.'
    },{
      title: 'Gestión documental',
      content: 'Gestión de la documentación, capaz de insertar y/o vincular documentos.'
    },{
      title: 'Responsive',
      content: 'Adaptación a la pantalla e integración con APIs.'
    }],
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

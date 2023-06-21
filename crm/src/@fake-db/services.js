const services = [
  {
    to: '/tool/web',
    toPDF: 'https://drive.google.com/file/d/1l3bayUhgUX2l7R9fD-CLMYIKyjKCRrdx/view?usp=share_link',
    icon: 'ph:pencil',
    iconColor: '#0000ff',
    tag: 'web',
    title: 'Editor Web',
    subtitle: 'Sitio web',
    image: '/src/assets/images/app/web.png',
    resume: `Si tu negocio no esta en internet tu negocio no existe.  - BILL GATES - `,
    cost: {
      starter: 500,
      profesional: 2000,
      startup: 6000
    },
    features: [
      {
        id: 0,
        content: 'Diseño a medida',
      },
      {
        id: 1,
        content: 'Autogestionable',
      },
      {
        id: 2,
        content: 'Responsive',
      },
      {
        id: 3,
        content: 'Dominio gratis',
      },
      {
        id: 4,
        content: 'Dominio personalizado'
      }
    ],
    allBenefits: [
      {
          id: 0,
          content: 'Marca copyright',
          starter: 'SI',
          profesional:'SI',
          startup:'N0'
        },
        {
          id: 1,
          content: 'Certificado SSL',
          starter: 'NO',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 2,
          content: 'Ancho de banda',
          starter: '1GB',
          profesional:'2GB',
          startup:'5GB'
        },
        {
          id: 3,
          content: 'Almacenamiento',
          starter: '500MB',
          profesional:'3GB',
          startup:'10GB'
        },
        {
          id: 4,
          content: 'SEO básico',
          starter: 'NO',
          profesional:'NO',
          startup:'SI'
        },
        {
          id: 5,
          content: 'Accesibilidad',
          starter: 'NO',
          profesional:'NO',
          startup:'SI'
        },
        {
          id: 6,
          content: 'Atención al cliente',
          starter: 'Email y tutoriales',
          profesional:'Soporte 24/7',
          startup:'Soporte prioritario'
        },
        {
          id: 7,
          content: 'Multilenguaje',
          starter: 'Incluye 2',
          profesional:'Incluye 3',
          startup:'Incluye 5'
        },
        {
          id: 8,
          content: 'Multiusuarios',
          starter: '1 usuario',
          profesional:'Desde 5 usuarios',
          startup:'Desde 20 usuarios'
        }
    ],
    relationBenefits: {
      starter: [],
      profesional: [0,1],
      startup:[0,1,2,3]
    },
    boe: [{
      title: 'Dominio',
      content: 'Registro del nombre del negocio, en caso de que no disponga de uno.'
    }, {
      title: 'Hosting',
      content: 'Alojamiento de la página web para el funcionamiento de la misma.'
    }, {
      title: 'Diseño web',
      content: 'Estructura web con un mínimo de tres páginas o apartados a medida.'
    }, {
      title: 'Responsive',
      content: 'Deben adaptarse para ser funcionales en cualquier dispositivos.'
    }, {
      title: 'Accesibilidad',
      content: 'Criterios de conformidad de nivel AA de las Pautas WCAG-2.1.'
    }, {
      title: 'Autogestionable',
      content: 'Se deberá proveer una plataforma autónoma a la hora de modificar.'
    }, {
      title: 'Posicionamiento básico',
      content: 'Posicionamiento de la información básica del negocio, contacto y perfil.'
    }, {
      title: 'Idiomas',
      content: 'Página web preparada y traducida a un idioma, además del castellano.'
    }],
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
    resume: `Crea un cliente no una venta. - Katherine Barchetti -`,
    cost: {
      starter: 500,
      profesional: 2000,
      startup: 6000
    },
    allBenefits: [
      {
          id: 1,
          content: 'Ancho de banda',
          starter: '1GB',
          profesional:'2GB',
          startup:'5GB'
        },
        {
          id: 2,
          content: 'Almacenamiento',
          starter: '500MB',
          profesional:'3GB',
          startup:'10GB'
        },
        {
          id: 3,
          content: 'SEO Básico',
          starter: 'SI',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 4,
          content: 'Accesibilidad',
          starter: 'SI',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 5,
          content: 'Catálogo disponible',
          starter: 'Máximo 100',
          profesional:'Máximo 200',
          startup:'Máximo 500'
        },
        {
          id: 6,
          content: 'Múltiples divisas',
          starter: 'SI',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 7,
          content: 'Acepta reseñas',
          starter: 'SI',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 8,
          content: 'Análisis de ventas',
          starter: 'SI',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 9,
          content: 'Atención al cliente',
          starter: 'Email y tutoriales',
          profesional:'Soporte 24/7',
          startup:'Soporte prioritario'
        },
        {
          id: 10,
          content: 'Multilenguaje',
          starter: 'Incluye 2',
          profesional:'Incluye 3',
          startup:'Incluye 5'
        },
        {
          id: 11,
          content: 'Multiusuarios',
          starter: '1 usuario',
          profesional:'Desde 5 usuarios',
          startup:'Desde 20 usuarios'
        }
    ],
    relationBenefits: {
      starter: [4],
      profesional: [4,5],
      startup:[4,5,6,7]
    },
    boe: [{
      title: 'Creación y alta',
      content: 'Creación de tienda online y alta del catálogo de productos.'
    }, {
      title: 'Métodos de pago',
      content: 'Configuración e integración de los métodos de pago.'
    }, {
      title: 'Diseño responsive',
      content: 'Debe adaptarse para ser funcional en todo tipo de dispositivos.'
    }, {
      title: 'Formas de envío',
      content: 'Configuración e integración de métodos de envío digital y físico.'
    }, {
      title: 'Accesibilidad',
      content: 'Criterios de conformidad de nivel AA de las Pautas WCAG-2.1.'
    }, {
      title: 'Autogestionable',
      content: 'Se deberá proveer una plataforma autónoma a la hora de modificar.'
    }, {
      title: 'Posicionamiento básico',
      content: 'Posicionamiento de la información básica del negocio.'
    }, {
      title: 'Optimización básica',
      content: 'Análisis de palabras clave, SEO On-Page de dos páginas del contenido.'
    }],
    features: [
      {
        id: 0,
        content: 'Pagos Seguros',
      },
      {
        id: 1,
        content: 'Pagos recurrentes',
      },
      {
        id: 2,
        content: 'Cuentas de clientes',
      },
      {
        id: 3,
        content: 'Dominio gratuito',
      },
      {
        id: 4,
        content: 'Dominio personalizado',
      },
      {
        id: 5,
        content: 'Marca copyright',
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
    resume: `Lo que no se puede medir, no se puede mejorar - Peter Drucker -`,
    cost: {
      starter: 500,
      profesional: 2000,
      startup: 6000
    },
    allBenefits: [
        {
          id: 1,
          content: 'Informe avanzado',
          starter: 'NO',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 2,
          content: 'Informes a demanda',
          starter: 'NO',
          profesional:'NO',
          startup:'SI'
        },
        {
          id: 3,
          content: 'Atención al cliente',
          starter: 'Email y tutoriales',
          profesional:'Soporte 24/7',
          startup:'Soporte prioritario'
        },
        {
          id: 4,
          content: 'Multilenguaje',
          starter: 'Incluye 2',
          profesional:'Incluye 3',
          startup:'Incluye 5'
        },
        {
          id: 5,
          content: 'Multiusuarios',
          starter: '1 usuario',
          profesional:'Desde 5 usuarios',
          startup:'Desde 20 usuarios'
        }
    ],
    relationBenefits: {
      starter: [],
      profesional: [8,9],
      startup:[8,9,10,11]
    },
    boe: [{
      title: 'Motores de búsqueda',
      content: 'Mejorar los datos para los distintos canales de búsqueda.'
    }, {
      title: 'Palabras clave',
      content: 'Gestión, búsqueda y análisis para desarrollar estrategias útiles.'
    }, {
      title: 'Competencia',
      content: 'Análisis de la competencia para informar de la situación del mercado.'
    }, {
      title: 'SEO On-page',
      content: 'Optimizar la estructura y el contenido interno.'
    }, {
      title: 'SEO Off-page',
      content: 'Ejecución de acciones fuera del entorno del sitio web.'
    }, {
      title: 'Informes',
      content: 'Reportar el resultado de las acciones ejecutadas para analizar la evolución.'
    }, {
      title: 'Tests',
      content: 'Comprueba si tu página y sus partes funcionan correctamente.'
    }, {
      title: 'Contenido',
      content: 'Analiza el contenido de tu página web para comprobar tu estrategia.'
    }],
    features: [
      {
        id: 0,
        content: 'Análisis actual',
      },
      {
        id: 1,
        content: 'Motores de búsqueda',
      },
      {
        id: 2,
        content: 'Paginas indexadas',
      },
      {
        id: 3,
        content: 'Sitempas',
      },
      {
        id: 4,
        content: 'Metaetiquetas',
      },
      {
        id: 5,
        content: 'Backlinks',
      },
      {
        id: 6,
        content: 'Test de velocidad',
      },
      {
        id: 7,
        content: 'Competencia',
      },
      {
        id: 8,
        content: 'Referencias',
      },
      {
        id: 9,
        content: 'Densidades',
      },
      {
        id: 10,
        content: 'Rastreabilidad',
      },
      {
        id: 11,
        content: 'Informe básico',
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
    subtitle: 'Redes Sociales',
    image: '/src/assets/images/app/rrss.png',
    resume: `En las redes sociales no vendes, enamoras. -Octavio Regalado -`,
    cost: {
      starter: 100,
      profesional: 500,
      startup: 2000
    },
    allBenefits: [
      {
          id: 1,
          content: 'Creación de contenido',
          starter: '5 posts incluídos',
          profesional:'12 posts incluídos',
          startup:'ilimitados'
        },
        {
          id: 2,
          content: 'Imágenes de Stock',
          starter: 'SI',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 3,
          content: 'Importar archivos',
          starter: 'SI',
          profesional:'SI',
          startup:'SI'
        },
      {
          id: 4,
          content: 'Atención al cliente',
          starter: 'Email y tutoriales',
          profesional:'Soporte 24/7',
          startup:'Soporte prioritario'
        },
        {
          id: 5,
          content: 'Multilenguaje',
          starter: 'Incluye 2',
          profesional:'Incluye 3',
          startup:'Incluye 5'
        },
        {
          id: 5,
          content: 'Multiusuarios',
          starter: '1 usuario',
          profesional:'Desde 5 usuarios',
          startup:'Desde 20 usuarios'
        }
    ],
    relationBenefits: {
      starter: [],
      profesional: [12,13],
      startup:[12,13,14,15]
    },
    boe: [{
      title: 'Social Media Plan',
      content: 'Definición e implementación de una estrategia de redes sociales.'
    }, {
      title: 'Monitorización',
      content: 'Control periódico a través de métricas del impacto.'
    }, {
      title: 'Optimización/Auditoría',
      content: 'Análisis de los diferentes canales sociales para poder optimizar.'
    }, {
      title: 'Gestión de una red social',
      content: 'Administración del perfil/usuario de la pyme en, al menos, una red social.'
    }, {
      title: 'Posts semanales',
      content: 'Un mínimo de 4-8 entradas (posts) mensuales para generar tráfico.'
    }, {
      title: 'Seguro y fácil',
      content: 'Un solo punto de acceso seguro para tus distintas redes sociales.'
    }, {
      title: 'Automatiza',
      content: 'Tus publicaciones para ahorrar tiempo y generar impactos.'
    }, {
      title: 'Estrategias',
      content: 'Ten los datos listos para crear estrategias para tus intereses.'
    }],
    features: [
      {
        id: 0,
        content: 'Autogestionable',
      },
      {
        id: 1,
        content: 'Redes Sociales',
      },
      {
        id: 2,
        content: 'Marca copyright',
      },
      {
        id: 3,
        content: 'Planificación',
      },
      {
        id: 4,
        content: 'Previsualización',
      },
      {
        id: 5,
        content: 'Automatización',
      },
      {
        id: 6,
        content: 'Análisis de impactos',
      }
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
    resume: `El teletrabajo es el camino menos transitado - Anónimo -`,
    cost: {
      starter: 500,
      profesional: 2000,
      startup: 6000
    },
     allBenefits: [
      {
          id: 1,
          content: 'Zoom y mesajeria',
          starter: 'NO',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 2,
          content: 'Diagrama de Grantt',
          starter: 'NO',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 3,
          content: 'Contratación',
          starter: 'SI',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 4,
          content: 'Facturas y gastos',
          starter: 'SI',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 5,
          content: 'Tiempo y cronómetro',
          starter: 'SI',
          profesional:'SI',
          startup:'SI'
        },
        {
          id: 6,
          content: 'Atención al cliente',
          starter: 'Email y tutoriales',
          profesional:'Soporte 24/7',
          startup:'Soporte prioritario'
        },
        {
          id: 7,
          content: 'Multilenguaje',
          starter: 'Incluye 2',
          profesional:'Incluye 3',
          startup:'Incluye 5'
        },
        {
          id: 8,
          content: 'Multiusuarios',
          starter: '1 usuario',
          profesional:'Desde 5 usuarios',
          startup:'Desde 20 usuarios'
        }
    ],
    relationBenefits: {
      starter: [],
      profesional: [16,17],
      startup:[16,17,18]
    },
    boe: [{
      title: 'Equipos de trabajo',
      content: 'Gestión ágil y eficiente para el desarrollo de proyectos.'
    }, {
      title: 'Compatibilidad',
      content: 'Con dispositivos móviles y a cualquier navegador.'
    }, {
      title: 'Almacenamiento',
      content: 'La solución proporcionará un almacenamiento de al menos 1 TB.'
    }, {
      title: 'Calendario y agenda',
      content: 'Permite organizar con un calendario para las tareas previstas.'
    }, {
      title: 'Organiza',
      content: 'Todas las tareas a realizar pen listas de tareas y en diferentes proyectos.'
    }, {
      title: 'Roles',
      content: 'Gestiona tu equipo y asigna roles para las distintas resposnabilidades.'
    }, {
      title: 'Completa o revisa',
      content: 'Actualiza el estado de las tareas y contacta a través del chat.'
    }, {
      title: 'Estipula tiempos',
      content: 'Controla con tiempo para una mejor organización grupal.'
    }],
    features: [
      {
        id: 0,
        content: 'Autogestionable',
      },
      {
        id: 1,
        content: 'Proyectos disponibles',
      },
      {
        id: 2,
        content: 'Miembros',
      },
      {
        id: 3,
        content: 'Roles y tareas',
      },
      {
        id: 3,
        content: 'Calendario',
      }
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
    resume: `Concretar una venta es importante, pero lograr la fidelidad es vital. - Stan Rapp`,
    cost: {
      starter: 500,
      profesional: 2000,
      startup: 6000
    },
    allBenefits: [
      {
        id: 1,
        content: 'Importar archivos',
        starter: 'NO',
        profesional:'NO',
        startup:'NO'
      },
      {
        id: 2,
        content: 'Sincronización',
        starter: 'SI',
        profesional:'SI',
        startup:'SI'
      },
      {
        id: 3,
        content: 'Integración Whatsapp',
        starter: 'SI',
        profesional:'SI',
        startup:'SI'
      },
      {
        id: 4,
        content: 'Mensajes automatizados',
        starter: '1GB',
        profesional:'2GB',
        startup:'1GB'
      },
      {
        id: 5,
        content: 'Responsive',
        starter: '500MB',
        profesional:'3GB',
        startup:'500MB'
      },
      {
        id: 6,
        content: 'Permisos y roles',
        starter: 'SI',
        profesional:'SI',
        startup:'SI'
      },
      {
        id: 7,
        content: 'Analiticas',
        starter: 'SI',
        profesional:'SI',
        startup:'SI'
      },
      {
        id: 8,
        content: 'Atención al cliente',
        starter: 'Email y tutoriales',
        profesional:'Soporte 24/7',
        startup:'Soporte prioritario'
      },
      {
        id: 9,
        content: 'Multilenguaje',
        starter: 'Incluye 2',
        profesional:'Incluye 3',
        startup:'Incluye 5'
      },
      {
        id: 10,
        content: 'Multiusuario',
        starter: '1 usuario',
        profesional:'Desde 5 usuarios',
        startup:'Desde 20 usuarios'
      },
    ],
    relationBenefits: {
      starter: [21,22,23],
      profesional: [21,22,23],
      startup: [21,22,23,24]
    },
    boe: [{
      title: 'Gestión de clientes',
      content: 'Almacena y permite la consulta de datos de cada cliente desde su alta.'
    }, {
      title: 'Clientes potenciales',
      content: 'Alta de nuevos Leads. De manera manual o mediante una importación.'
    }, {
      title: 'Oportunidades',
      content: 'Envío al cliente potencial o Lead de ofertas y presupuestos.'
    }, {
      title: 'Acciones comerciales',
      content: 'Crear acciones y tareas comerciales, tanto manual como automática.'
    }, {
      title: 'Reporting y seguimiento',
      content: 'Indicadores para el seguimiento y monitorización de la actividad.'
    }, {
      title: 'Notificaciones',
      content: 'Visualizar alertas de clientes en formato gráfico.'
    }, {
      title: 'Gestión documental',
      content: 'Gestión de la documentación, capaz de insertar y/o vincular documentos.'
    }, {
      title: 'Responsive',
      content: 'Adaptación a la pantalla e integración con APIs.'
    }],
    features: [
      {
        id: 0,
        content: 'Autogestionable',
      },
      {
        id: 1,
        content: 'Disponible offline',
      },
      {
        id: 2,
        content: 'Base de Datos',
      }
    ]
  },
]


const listServices = [
    {
      "id": 1,
      "content": "1 año mantenimiento incluído"
    },
    {
      "id": 2,
      "content": "Tutoriales y asesoramiento"
    },
    {
      "id": 3,
      "content": "Soporte 24/7"
    },
    {
      "id": 4,
      "content": "3 planes disponibles"
    },
    
  ]
  
  module.exports = { services,   listServices, };
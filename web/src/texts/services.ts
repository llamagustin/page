import Atlassian from '/assets/apps/atlassian-light.svg'
import Airbnb from '/assets/apps/airbnb-light.svg'
import Gitlab from '/assets/apps/gitlab-light.svg'
import Github from '/assets/apps/github-light.svg'
import Google from '/assets/apps/google-light.svg'
import Tnw from '/assets/apps/tnw-light.svg'
import Hubspot from '/assets/apps/hubspot-light.svg'
import Dribbble from '/assets/apps/dribbble-light.svg'
import Monday from '/assets/apps/monday-light.svg'

import Vue from '/assets/stacks/vuejs-light.svg'
import React from '/assets/stacks/reactjs-light.svg'
import Sass from '/assets/stacks/sass-light.svg'
import Javascript from '/assets/stacks/js-light.svg'
import NodeJS from '/assets/stacks/nodejs-light.svg'
import Typescript from '/assets/stacks/typescript-light.svg'
import Golang from '/assets/stacks/golang.svg'
import Bulma from '/assets/stacks/bulma-light.svg'
import Html5 from '/assets/stacks/html5-light.svg'
import Illustrator from '/assets/stacks/illustrator-light.svg'
import Photoshop from '/assets/stacks/photoshop-light.svg'
import Sketch from '/assets/stacks/sketch-light.svg'
import STRAPI from '/assets/stacks/strapi-light.svg'

import Kubernetes from '/assets/stacks/kubernetes.svg'
import Docker from '/assets/stacks/docker-light.svg'
import GoogleCloud from '/assets/stacks/google-cloud-light.svg'
import Terraform from '/assets/stacks/terraform-light.svg'
import Ansible from '/assets/stacks/ansible.svg'
import Kafka from '/assets/stacks/kafka.svg'
import Mongodb from '/assets/stacks/mongodb-light.svg'
import Redis from '/assets/stacks/redis.svg'




export const markdownObject = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.

#### Choose a plan first

Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

*   Discovery pricing
*   Business pricing

#### Activate your account

Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.

#### Perform initial setup

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.

*   Create a company
*   Add users to your team
*   Start working
`

import type { Service, IconFeature } from '/@src/types'
import type { PostItem } from '/@src/components/advanced/blog/blog-grid-item/BlogGridItem.vue'

export const services = [
    {
        "to": "/tool/web",
        "toPDF": "/assets/docs/WEB.pdf",
        "icon": "ph:pencil",
        "iconColor": "#0000ff",
        "tag": "web",
        "title": "Editor Web",
        "subtitle": "Sitio web",
        "image": "/src/assets/images/app/web.png",
        "resume": "Si tu negocio no esta en internet tu negocio no existe.  - Bill Gates - ",
        "cost": {
            "starter": 500,
            "profesional": 2000,
            "startup": 6000
        },
        "features": [{
                "id": 0,
                "content": "Diseño a medida"
            }, {
                "id": 1,
                "content": "Autogestionable"
            }, {
                "id": 2,
                "content": "Responsive"
            }, {
                "id": 3,
                "content": "Dominio gratis"
            }, {
                "id": 4,
                "content": "Dominio personalizado"
            }
        ],
        "allBenefits": [{
                "id": 0,
                "content": "Marca copyright",
                "starter": "SI",
                "profesional": "SI",
                "startup": "N0"
            }, {
                "id": 1,
                "content": "Certificado SSL",
                "starter": "NO",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 2,
                "content": "Ancho de banda",
                "starter": "1GB",
                "profesional": "2GB",
                "startup": "5GB"
            }, {
                "id": 3,
                "content": "Almacenamiento",
                "starter": "500MB",
                "profesional": "3GB",
                "startup": "10GB"
            }, {
                "id": 4,
                "content": "SEO básico",
                "starter": "NO",
                "profesional": "NO",
                "startup": "SI"
            }, {
                "id": 5,
                "content": "Accesibilidad",
                "starter": "NO",
                "profesional": "NO",
                "startup": "SI"
            }, {
                "id": 6,
                "content": "Atención al cliente",
                "starter": "Email y tutoriales",
                "profesional": "Soporte 24/7",
                "startup": "Soporte prioritario"
            }, {
                "id": 7,
                "content": "Multilenguaje",
                "starter": "Incluye 2",
                "profesional": "Incluye 3",
                "startup": "Incluye 5"
            }, {
                "id": 8,
                "content": "Multiusuarios",
                "starter": "1 usuario",
                "profesional": "Desde 5 usuarios",
                "startup": "Desde 20 usuarios"
            }
        ],
        "relationBenefits": {
            "starter": [],
            "profesional": [0, 1],
            "startup": [0, 1, 2, 3]
        },
        "boe": [{
                "title": "Dominio",
                "content": "Registro del nombre del negocio, en caso de que no disponga de uno."
            }, {
                "title": "Hosting",
                "content": "Alojamiento de la página web para el funcionamiento de la misma."
            }, {
                "title": "Diseño web",
                "content": "Estructura web con un mínimo de tres páginas o apartados a medida."
            }, {
                "title": "Responsive",
                "content": "Deben adaptarse para ser funcionales en cualquier dispositivos."
            }, {
                "title": "Accesibilidad",
                "content": "Criterios de conformidad de nivel AA de las Pautas WCAG-2.1."
            }, {
                "title": "Autogestionable",
                "content": "Se deberá proveer una plataforma autónoma a la hora de modificar."
            }, {
                "title": "Posicionamiento básico",
                "content": "Posicionamiento de la información básica del negocio, contacto y perfil."
            }, {
                "title": "Idiomas",
                "content": "Página web preparada y traducida a un idioma, además del castellano."
            }
        ]
    }, {
        "to": "/tool/ecommerce",
        "toPDF": "/assets/docs/SHOP.pdf",
        "icon": "ph:storefront",
        "iconColor": "#13d33b",
        "tag": "ecommerce",
        "title": "E-commerce",
        "subtitle": "Tienda online",
        "image": "/src/assets/images/app/ecommerce.png",
        "resume": "Crea un cliente no una venta. - Katherine Barchetti -",
        "cost": {
            "starter": 500,
            "profesional": 2000,
            "startup": 6000
        },
        "allBenefits": [{
                "id": 1,
                "content": "Ancho de banda",
                "starter": "1GB",
                "profesional": "2GB",
                "startup": "5GB"
            }, {
                "id": 2,
                "content": "Almacenamiento",
                "starter": "500MB",
                "profesional": "3GB",
                "startup": "10GB"
            }, {
                "id": 3,
                "content": "SEO Básico",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 4,
                "content": "Accesibilidad",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 5,
                "content": "Catálogo disponible",
                "starter": "Máximo 100",
                "profesional": "Máximo 200",
                "startup": "Máximo 500"
            }, {
                "id": 6,
                "content": "Múltiples divisas",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 7,
                "content": "Acepta reseñas",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 8,
                "content": "Análisis de ventas",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 9,
                "content": "Atención al cliente",
                "starter": "Email y tutoriales",
                "profesional": "Soporte 24/7",
                "startup": "Soporte prioritario"
            }, {
                "id": 10,
                "content": "Multilenguaje",
                "starter": "Incluye 2",
                "profesional": "Incluye 3",
                "startup": "Incluye 5"
            }, {
                "id": 11,
                "content": "Multiusuarios",
                "starter": "1 usuario",
                "profesional": "Desde 5 usuarios",
                "startup": "Desde 20 usuarios"
            }
        ],
        "relationBenefits": {
            "starter": [4],
            "profesional": [4, 5],
            "startup": [4, 5, 6, 7]
        },
        "boe": [{
                "title": "Creación y alta",
                "content": "Creación de tienda online y alta del catálogo de productos."
            }, {
                "title": "Métodos de pago",
                "content": "Configuración e integración de los métodos de pago."
            }, {
                "title": "Diseño responsive",
                "content": "Debe adaptarse para ser funcional en todo tipo de dispositivos."
            }, {
                "title": "Formas de envío",
                "content": "Configuración e integración de métodos de envío digital y físico."
            }, {
                "title": "Accesibilidad",
                "content": "Criterios de conformidad de nivel AA de las Pautas WCAG-2.1."
            }, {
                "title": "Autogestionable",
                "content": "Se deberá proveer una plataforma autónoma a la hora de modificar."
            }, {
                "title": "Posicionamiento básico",
                "content": "Posicionamiento de la información básica del negocio."
            }, {
                "title": "Optimización básica",
                "content": "Análisis de palabras clave, SEO On-Page de dos páginas del contenido."
            }
        ],
        "features": [{
                "id": 0,
                "content": "Pagos Seguros"
            }, {
                "id": 1,
                "content": "Pagos recurrentes"
            }, {
                "id": 2,
                "content": "Cuentas de clientes"
            }, {
                "id": 3,
                "content": "Dominio gratuito"
            }, {
                "id": 4,
                "content": "Dominio personalizado"
            }, {
                "id": 5,
                "content": "Marca copyright"
            }
        ]
    }, {
        "to": "/tool/seo+sem",
        "toPDF": "/assets/docs/SEO.pdf",
        "icon": "ph:funnel",
        "iconColor": "#f7e06f",
        "tag": "seo",
        "title": "SEO",
        "subtitle": "Presencia avanzada",
        "image": "/src/assets/images/app/seo.png",
        "resume": "Lo que no se puede medir, no se puede mejorar - Peter Drucker -",
        "cost": {
            "starter": 500,
            "profesional": 2000,
            "startup": 6000
        },
        "allBenefits": [{
                "id": 1,
                "content": "Informe avanzado",
                "starter": "NO",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 2,
                "content": "Informes a demanda",
                "starter": "NO",
                "profesional": "NO",
                "startup": "SI"
            }, {
                "id": 3,
                "content": "Atención al cliente",
                "starter": "Email y tutoriales",
                "profesional": "Soporte 24/7",
                "startup": "Soporte prioritario"
            }, {
                "id": 4,
                "content": "Multilenguaje",
                "starter": "Incluye 2",
                "profesional": "Incluye 3",
                "startup": "Incluye 5"
            }, {
                "id": 5,
                "content": "Multiusuarios",
                "starter": "1 usuario",
                "profesional": "Desde 5 usuarios",
                "startup": "Desde 20 usuarios"
            }
        ],
        "relationBenefits": {
            "starter": [],
            "profesional": [8, 9],
            "startup": [8, 9, 10, 11]
        },
        "boe": [{
                "title": "Motores de búsqueda",
                "content": "Mejorar los datos para los distintos canales de búsqueda."
            }, {
                "title": "Palabras clave",
                "content": "Gestión, búsqueda y análisis para desarrollar estrategias útiles."
            }, {
                "title": "Competencia",
                "content": "Análisis de la competencia para informar de la situación del mercado."
            }, {
                "title": "SEO On-page",
                "content": "Optimizar la estructura y el contenido interno."
            }, {
                "title": "SEO Off-page",
                "content": "Ejecución de acciones fuera del entorno del sitio web."
            }, {
                "title": "Informes",
                "content": "Reportar el resultado de las acciones ejecutadas para analizar la evolución."
            }, {
                "title": "Tests",
                "content": "Comprueba si tu página y sus partes funcionan correctamente."
            }, {
                "title": "Contenido",
                "content": "Analiza el contenido de tu página web para comprobar tu estrategia."
            }
        ],
        "features": [{
                "id": 0,
                "content": "Análisis actual"
            }, {
                "id": 1,
                "content": "Motores de búsqueda"
            }, {
                "id": 2,
                "content": "Paginas indexadas"
            }, {
                "id": 3,
                "content": "Sitempas"
            }, {
                "id": 4,
                "content": "Metaetiquetas"
            }, {
                "id": 5,
                "content": "Backlinks"
            }, {
                "id": 6,
                "content": "Test de velocidad"
            }, {
                "id": 7,
                "content": "Competencia"
            }, {
                "id": 8,
                "content": "Referencias"
            }, {
                "id": 9,
                "content": "Densidades"
            }, {
                "id": 10,
                "content": "Rastreabilidad"
            }, {
                "id": 11,
                "content": "Informe básico"
            }
        ]
    }, {
        "to": "/tool/rrss",
        "toPDF": "/assets/docs/RRSS.pdf",
        "icon": "ph:chat-circle",
        "iconColor": "#d21643",
        "tag": "social",
        "title": "Redes Sociales",
        "subtitle": "Redes Sociales",
        "image": "/src/assets/images/app/rrss.png",
        "resume": "En las redes sociales no vendes, enamoras. -Octavio Regalado -",
        "cost": {
            "starter": 100,
            "profesional": 500,
            "startup": 2000
        },
        "allBenefits": [{
                "id": 1,
                "content": "Creación de contenido",
                "starter": "5 posts incluídos",
                "profesional": "12 posts incluídos",
                "startup": "ilimitados"
            }, {
                "id": 2,
                "content": "Imágenes de Stock",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 3,
                "content": "Importar archivos",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 4,
                "content": "Atención al cliente",
                "starter": "Email y tutoriales",
                "profesional": "Soporte 24/7",
                "startup": "Soporte prioritario"
            }, {
                "id": 5,
                "content": "Multilenguaje",
                "starter": "Incluye 2",
                "profesional": "Incluye 3",
                "startup": "Incluye 5"
            }, {
                "id": 5,
                "content": "Multiusuarios",
                "starter": "1 usuario",
                "profesional": "Desde 5 usuarios",
                "startup": "Desde 20 usuarios"
            }
        ],
        "relationBenefits": {
            "starter": [],
            "profesional": [12, 13],
            "startup": [12, 13, 14, 15]
        },
        "boe": [{
                "title": "Social Media Plan",
                "content": "Definición e implementación de una estrategia de redes sociales."
            }, {
                "title": "Monitorización",
                "content": "Control periódico a través de métricas del impacto."
            }, {
                "title": "Optimización/Auditoría",
                "content": "Análisis de los diferentes canales sociales para poder optimizar."
            }, {
                "title": "Gestión de una red social",
                "content": "Administración del perfil/usuario de la pyme en, al menos, una red social."
            }, {
                "title": "Posts semanales",
                "content": "Un mínimo de 4-8 entradas (posts) mensuales para generar tráfico."
            }, {
                "title": "Seguro y fácil",
                "content": "Un solo punto de acceso seguro para tus distintas redes sociales."
            }, {
                "title": "Automatiza",
                "content": "Tus publicaciones para ahorrar tiempo y generar impactos."
            }, {
                "title": "Estrategias",
                "content": "Ten los datos listos para crear estrategias para tus intereses."
            }
        ],
        "features": [{
                "id": 0,
                "content": "Autogestionable"
            }, {
                "id": 1,
                "content": "Redes Sociales"
            }, {
                "id": 2,
                "content": "Marca copyright"
            }, {
                "id": 3,
                "content": "Planificación"
            }, {
                "id": 4,
                "content": "Previsualización"
            }, {
                "id": 5,
                "content": "Automatización"
            }, {
                "id": 6,
                "content": "Análisis de impactos"
            }
        ]
    }, {
        "to": "/tool/office",
        "toPDF": "/assets/docs/OFFICE.pdf",
        "icon": "ph:headset",
        "iconColor": "#d216ff",
        "tag": "office",
        "title": "Oficina Virtual",
        "subtitle": "Oficina Virtual",
        "image": "/src/assets/images/app/office.png",
        "resume": "El teletrabajo es el camino menos transitado - Anónimo -",
        "cost": {
            "starter": 500,
            "profesional": 2000,
            "startup": 6000
        },
        "allBenefits": [{
                "id": 1,
                "content": "Zoom y mesajeria",
                "starter": "NO",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 2,
                "content": "Diagrama de Grantt",
                "starter": "NO",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 3,
                "content": "Contratación",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 4,
                "content": "Facturas y gastos",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 5,
                "content": "Tiempo y cronómetro",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 6,
                "content": "Atención al cliente",
                "starter": "Email y tutoriales",
                "profesional": "Soporte 24/7",
                "startup": "Soporte prioritario"
            }, {
                "id": 7,
                "content": "Multilenguaje",
                "starter": "Incluye 2",
                "profesional": "Incluye 3",
                "startup": "Incluye 5"
            }, {
                "id": 8,
                "content": "Multiusuarios",
                "starter": "1 usuario",
                "profesional": "Desde 5 usuarios",
                "startup": "Desde 20 usuarios"
            }
        ],
        "relationBenefits": {
            "starter": [],
            "profesional": [16, 17],
            "startup": [16, 17, 18]
        },
        "boe": [{
                "title": "Equipos de trabajo",
                "content": "Gestión ágil y eficiente para el desarrollo de proyectos."
            }, {
                "title": "Compatibilidad",
                "content": "Con dispositivos móviles y a cualquier navegador."
            }, {
                "title": "Almacenamiento",
                "content": "La solución proporcionará un almacenamiento de al menos 1 TB."
            }, {
                "title": "Calendario y agenda",
                "content": "Permite organizar con un calendario para las tareas previstas."
            }, {
                "title": "Organiza",
                "content": "Todas las tareas a realizar con tu lista, proyectos y miembros"
            }, {
                "title": "Roles",
                "content": "Gestiona tu equipo y asigna roles para las distintas responsabilidades."
            }, {
                "title": "Completa o revisa",
                "content": "Actualiza el estado de las tareas y contacta a través del chat."
            }, {
                "title": "Facturación electrónica",
                "content": "Genera facturas ilimitadas personalizables y accede a tus registros."
            }
        ],
        "features": [{
                "id": 0,
                "content": "Autogestionable"
            }, {
                "id": 1,
                "content": "Proyectos disponibles"
            }, {
                "id": 2,
                "content": "Miembros"
            }, {
                "id": 3,
                "content": "Roles y tareas"
            }, {
                "id": 3,
                "content": "Calendario"
            }
        ]
    }, {
        "to": "/tool/crm",
        "toPDF": "/assets/docs/CRM.pdf",
        "icon": "ph:users",
        "iconColor": "#ffa726",
        "tag": "crm",
        "title": "CRM",
        "subtitle": "Gestión de Clientes",
        "image": "/src/assets/images/app/crm.png",
        "resume": "Concretar una venta es importante, pero lograr la fidelidad es vital. - Stan Rapp",
        "cost": {
            "starter": 500,
            "profesional": 2000,
            "startup": 6000
        },
        "allBenefits": [{
                "id": 1,
                "content": "Importar archivos",
                "starter": "NO",
                "profesional": "NO",
                "startup": "NO"
            }, {
                "id": 2,
                "content": "Sincronización",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 3,
                "content": "Integración Whatsapp",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 4,
                "content": "Mensajes automatizados",
                "starter": "1GB",
                "profesional": "2GB",
                "startup": "1GB"
            }, {
                "id": 5,
                "content": "Responsive",
                "starter": "500MB",
                "profesional": "3GB",
                "startup": "500MB"
            }, {
                "id": 6,
                "content": "Permisos y roles",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 7,
                "content": "Analiticas",
                "starter": "SI",
                "profesional": "SI",
                "startup": "SI"
            }, {
                "id": 8,
                "content": "Atención al cliente",
                "starter": "Email y tutoriales",
                "profesional": "Soporte 24/7",
                "startup": "Soporte prioritario"
            }, {
                "id": 9,
                "content": "Multilenguaje",
                "starter": "Incluye 2",
                "profesional": "Incluye 3",
                "startup": "Incluye 5"
            }, {
                "id": 10,
                "content": "Multiusuario",
                "starter": "1 usuario",
                "profesional": "Desde 5 usuarios",
                "startup": "Desde 20 usuarios"
            }
        ],
        "relationBenefits": {
            "starter": [21, 22, 23],
            "profesional": [21, 22, 23],
            "startup": [21, 22, 23, 24]
        },
        "boe": [{
                "title": "Gestión de clientes",
                "content": "Almacena y permite la consulta de datos de cada cliente desde su alta."
            }, {
                "title": "Clientes potenciales",
                "content": "Alta de nuevos Leads. De manera manual o mediante una importación."
            }, {
                "title": "Oportunidades",
                "content": "Envío al cliente potencial o Lead de ofertas y presupuestos."
            }, {
                "title": "Acciones comerciales",
                "content": "Crear acciones y tareas comerciales, tanto manual como automática."
            }, {
                "title": "Reporting y seguimiento",
                "content": "Indicadores para el seguimiento y monitorización de la actividad."
            }, {
                "title": "Notificaciones",
                "content": "Visualizar alertas de clientes en formato gráfico."
            }, {
                "title": "Gestión documental",
                "content": "Gestión de la documentación, capaz de insertar y/o vincular documentos."
            }, {
                "title": "Responsive",
                "content": "Adaptación a la pantalla e integración con APIs."
            }
        ],
        "features": [{
                "id": 0,
                "content": "Autogestionable"
            }, {
                "id": 1,
                "content": "Disponible offline"
            }, {
                "id": 2,
                "content": "Base de Datos"
            }
        ]
    }
]


export const post: PostItem = {
  id: 7,
  image: '/assets/posts/post-1.svg',
  title: 'How 3D and augmented reality are changing our world',
  category: 'Technology',
  abstract:
    'In 2022, ecommerce is thriving like never before, and Amazon is the leading marketplace. If you’re...',
  date: 'March 17th, 2022',
  duration: 2,
  views: '3.1k',
  author: {
    photo: 'data:image/gif;base64,replace_with_your_image',
    name: 'Mike Wilson',
    role: 'Web Developer',
  },
  related: [
    {
      id: 1,
      image: '/assets/posts/post-2.svg',
      title: 'Fighting stress when preparing yourself for an interview',
      abstract:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vides, quid faciat. Mihi vero, inquit placet delorum relopus...',
      views: '1.1k',
      category: 'jobs',
      date: 'March 17th, 2022',
      duration: 2,
      author: {
        photo: 'data:image/gif;base64,replace_with_your_image',
        role: 'Author',
        name: 'Helen Miller',
      },
      content:
        '<p> Today, investing in advertising is part of the cost of doing business, but if performance takes a while to materialize, it could put you in a hole that’s difficult to dig out of. Many small businesses come to Vulk to solve this exact problem – to improve their ads performance as they begin ramping up their spend on Amazon ads. </p><h2 class="title is-3"> Value of the Vulk bidder for small businesses </h2> <p> A new analysis shows why more and more brands are moving towards Vulk and our advanced bidding engine. Vulk’ software helps the vast majority of sellers drive dramatically more revenue in a matter of months, even if their advertising activity prior to coming to Vulk was low or non-existent. </p><p> Hundreds of sellers signed up for Vulk last year having spent $315 or less on advertising in the prior 60 days. </p><p> Just 60 days after turning on Vulk and our bidding technology, those same sellers experienced median sales jumps of more than 24X from the previous period. </p><p> For smaller sellers, this analysis shows how Vulk software can put you in the best position to scale your advertising on Amazon, and improve sales dramatically, without sacrificing time or efficiency. Even if you are new to advertising on Amazon, our software and bidding technology can help take you to the next level, and make the most out of your investment. </p><h2 class="title is-3">Methodology</h2> <p> This analysis is restricted to 350 Amazon sellers using Vulk for the first time in 2020. The data examined spans both the 60 days prior to using Vulk, along with the first 60 days using the platform and associated bidder. For ease of comparison, sellers were grouped according to their pre-Vulk advertising spend amounts. See the companion study for data on larger brands. </p>',
    },
    {
      id: 2,
      image: '/assets/posts/post-3.svg',
      title: '3 tips that will help you grow your eco-responsability',
      abstract:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vides, quid faciat. Mihi vero, inquit placet delorum relopus...',
      views: '1.2k',
      category: 'ecology',
      date: 'March 17th, 2022',
      duration: 2,
      author: {
        photo: 'data:image/gif;base64,replace_with_your_image',
        role: 'Author',
        name: 'Melanie Growls',
      },
      content:
        '<p> Today, investing in advertising is part of the cost of doing business, but if performance takes a while to materialize, it could put you in a hole that’s difficult to dig out of. Many small businesses come to Vulk to solve this exact problem – to improve their ads performance as they begin ramping up their spend on Amazon ads. </p><h2 class="title is-3"> Value of the Vulk bidder for small businesses </h2> <p> A new analysis shows why more and more brands are moving towards Vulk and our advanced bidding engine. Vulk’ software helps the vast majority of sellers drive dramatically more revenue in a matter of months, even if their advertising activity prior to coming to Vulk was low or non-existent. </p><p> Hundreds of sellers signed up for Vulk last year having spent $315 or less on advertising in the prior 60 days. </p><p> Just 60 days after turning on Vulk and our bidding technology, those same sellers experienced median sales jumps of more than 24X from the previous period. </p><p> For smaller sellers, this analysis shows how Vulk software can put you in the best position to scale your advertising on Amazon, and improve sales dramatically, without sacrificing time or efficiency. Even if you are new to advertising on Amazon, our software and bidding technology can help take you to the next level, and make the most out of your investment. </p><h2 class="title is-3">Methodology</h2> <p> This analysis is restricted to 350 Amazon sellers using Vulk for the first time in 2020. The data examined spans both the 60 days prior to using Vulk, along with the first 60 days using the platform and associated bidder. For ease of comparison, sellers were grouped according to their pre-Vulk advertising spend amounts. See the companion study for data on larger brands. </p>',
    },
    {
      id: 3,
      image: '/assets/posts/post-4.svg',
      title: '5 pro tips and strategies to make more working less',
      abstract:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vides, quid faciat. Mihi vero, inquit placet delorum relopus...',
      views: '1.4k',
      category: 'business',
      date: 'March 17th, 2022',
      duration: 2,
      author: {
        photo: 'data:image/gif;base64,replace_with_your_image',
        role: 'Author',
        name: 'Esperanza Paraisio',
      },
      content:
        '<p> Today, investing in advertising is part of the cost of doing business, but if performance takes a while to materialize, it could put you in a hole that’s difficult to dig out of. Many small businesses come to Vulk to solve this exact problem – to improve their ads performance as they begin ramping up their spend on Amazon ads. </p><h2 class="title is-3"> Value of the Vulk bidder for small businesses </h2> <p> A new analysis shows why more and more brands are moving towards Vulk and our advanced bidding engine. Vulk’ software helps the vast majority of sellers drive dramatically more revenue in a matter of months, even if their advertising activity prior to coming to Vulk was low or non-existent. </p><p> Hundreds of sellers signed up for Vulk last year having spent $315 or less on advertising in the prior 60 days. </p><p> Just 60 days after turning on Vulk and our bidding technology, those same sellers experienced median sales jumps of more than 24X from the previous period. </p><p> For smaller sellers, this analysis shows how Vulk software can put you in the best position to scale your advertising on Amazon, and improve sales dramatically, without sacrificing time or efficiency. Even if you are new to advertising on Amazon, our software and bidding technology can help take you to the next level, and make the most out of your investment. </p><h2 class="title is-3">Methodology</h2> <p> This analysis is restricted to 350 Amazon sellers using Vulk for the first time in 2020. The data examined spans both the 60 days prior to using Vulk, along with the first 60 days using the platform and associated bidder. For ease of comparison, sellers were grouped according to their pre-Vulk advertising spend amounts. See the companion study for data on larger brands. </p>',
    },
  ],
  content:
    '<p>Companies like Apple and Google are investing huge amounts of capital into Augmented Reality, or AR . The Pokemon Go craze of July 2016 was a taste of how AR can impact our lives. But will AR really change our lives that much? Does AR have the potential to be a transformational technology that totally reorders how we live?</p><p>I reached out to 39 experts on AR to share how AR can change our lives. Here are the ideas they shared.</p><h2>Digital Twins Will Help Companies See Problems — and Opportunities</h2><p>According to Timo Elliott, Innovation Evangelist at SAP, “Digital twin technology which uses detailed virtual 3D models and AR will revolutionize the way companies understand customer needs, continuously improve their products and services, and identify new business models. For example, when an employee at an energy company with wind farms in Norway detects a problem, she can put on a pair of VR goggles, “visualize” the issue, and fix it using digital twins — no need to send a repair team into the field. Coupled with other technologies such as artificial intelligence for image recognition, companies can optimize the creation, monitoring, and maintenance of complex systems. Digital twins will become a part of daily operations in areas as diverse as building maintenance to monitoring patients with heart disease.”</p><h2>AR and Mobile Based Contextual Information</h2><p>“One of the ways AR will challenge the world around us is mobile-based contextual information, leveraging the vast network of Internet-connected mobile devices in the world today. Mobile AR systems are innovative and noteworthy because it transforms the user experience in real-time. It takes any situation, and environment to the next level by incorporating a user’s contextual cues generated from sensors without a manual search.Because of this complexity, there may be challenges to mobile devices being able to process the technology required to power it. We imagine this playing out in the next 5 years or so.” — Vishwa Ranjan, Head of Augmented and Virtual Reality at Infosys.</p><h2>AR changing the way families play together</h2><p>It’s nearly impossible to escape the debate of screen time for children. For years, it has been an ongoing concern — adults thinking kids today are onscreen, leaving the “real world” behind. Now, we’re at the early stages of rethinking the split attention between play spaces, to push beyond use of a traditional 2D screen and find new ways to get our digital kids up and active. This is the real challenge today… How can we create immersive experiences that have physical and digital intersect seamlessly? AR is positioning itself to be a daily reality for the mainstream consumer, and, if you watch the patents, there’s a big push towards AR Glasses, arguably the next great leap in wearables. This will change the way we think about mobile as an object in our hand to an action and mindset for both parents and children to play outside together in story-driven, location based games. — Erin Reilly, CEO, Reillyworks | Founding Member of USC Annenberg Innovation Lab</p><h2>Access to just-in-time information, anytime, anywhere</h2><p>Michael Martoccia, Immersive Strategist and lead associate for Booz Allen Hamilton, shared these thoughts about how augmented reality (AR) and other immersive technology will change the world:</p><p>Augmented reality (AR) technologies will give us access to just-in-time information, anytime, anywhere.</p><p>These technologies will empower people to time travel into the past from anywhere using a simple headset or other immersive device, enhancing educational and travel experiences.</p><p>AR will enhance a person’s perception of reality, with the ability to alter views to delete or add data, scenarios and other elements of sight and sound.</p><p>And, “what you see is what you get” will become the new norm for shopping as consumers can see and demand purchase anything at any time, everywhere.</p><h2>AR will revolutionize management in every industry</h2><p>AR will transform how supervisors do their job, in any industry, according to Simon Wright, an AR/VR developer at Genesys. Imagine supervisors walking the floor with a fighter pilot-style display in front of their eyes. Supervisors can read performance data instantly to help employees with difficult issues, or identify employees who are falling behind. This AR pinpoints problem issues in real time and shows a supervisor where to devote time and effort for the best outcomes. This AR will give supervisors observational and analytical “superpowers” at the same time.</p><h2>Replacing User Manuals with Real-Time Instructions via AR Apps</h2><p>“Augmented reality is primed to make product manuals obsolete. Paper manuals require interpretation of words and graphic illustrations. AR programs, enabled either through headwear or smartphones, will recognize objects and overlay text and/or video instructions. AR glasses will provide the best experience of this, allowing for hands-free, real-time instruction viewing in line with user action. Early use cases for this will include LEGO-like toys, and IKEA-like build-your-own furniture.” — Dr. Yue Fei, CTO of uSens, a Silicon Valley-based creator of gesture-tracking software and hardware for AR/VR applications.</p>',
}



export const helpCenterCategories = [
  {
    slug: 'welcome-category',
    icon: 'ph:hand-waving-duotone',
    iconColor: 'yellow',
    name: 'Welcome',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Edwin Tyler',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
      {
        name: 'Helen Miller',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
      {
        name: 'Jake Rowland',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
    ],
    articles: [
      {
        slug: 'making-your-first-steps',
        title: 'Getting started',
        subtitle: 'Making your first steps with our application',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Jake Rowland',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'configuration-options',
        title: 'Configuration options',
        subtitle: 'Explore configuration options based on your requirements',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'about 2 days ago',
        author: {
          name: 'Edwin Tyler',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'creating-an-account',
        title: 'Creating an account',
        subtitle: 'Create your account and fill in required info',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'about 3 weeks ago',
        author: {
          name: 'Helen Miller',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'creating-a-company',
        title: 'Creating a company',
        subtitle: 'Setup your company account to start adding products',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'about 3 weeks ago',
        author: {
          name: 'Helen Miller',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
    ],
  },
  {
    slug: 'project-module-category',
    icon: 'ph:folder-simple-dotted-duotone',
    iconColor: 'success',
    name: 'Projects Module',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Jake Rowland',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
      {
        name: 'Helen Miller',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
    ],
    articles: [
      {
        slug: 'creating-a-project',
        title: 'Creating a project',
        subtitle: 'Create your first project and start adding tasks',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one month ago',
        author: {
          name: 'Jake Rowland',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'managing-tasks',
        title: 'Managing tasks',
        subtitle: 'Assign, revoke and manage your tasks',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Helen Miller',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'uploading-attachments',
        title: 'Uploading attachments',
        subtitle: 'Start uploading documents, images and videos',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: '2 weeks ago',
        author: {
          name: 'Helen Miller',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'managing-user-access',
        title: 'Managing user access',
        subtitle: 'Manage permissions and user rights',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Jake Rowland',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'configuring-a-gantt-view',
        title: 'Configuring a Gantt view',
        subtitle: 'Plan efficiently by using the built-in Gantt view',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Jake Rowland',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
    ],
  },
  {
    slug: 'sales-module-category',
    icon: 'ph:t-shirt-duotone',
    iconColor: 'secondary',
    name: 'Sales Module',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Christina Chu',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
      {
        name: 'Ina Volkov',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
      {
        name: 'Pete Jackson',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
    ],
    articles: [
      {
        slug: 'setting-up-cutomer-payments',
        title: 'Setting up customer payments',
        subtitle: 'Learn how to enable payments on your storefront',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: '3 weeks ago',
        author: {
          name: 'Christina Chu',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'configuring-customer-registration',
        title: 'Configuring customer registration',
        subtitle: 'Configure how users are getting registered on the store',
        abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Pete Jackson',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'adding-products',
        title: 'Adding products',
        subtitle: 'Add your first products to the catalogue',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: '3 days ago',
        author: {
          name: 'Christina Chu',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'creating-product-variants',
        title: 'Creating product variants',
        subtitle: 'Making your first steps',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Ina Volkov',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'managing-product-variants',
        title: 'Managing product variants',
        subtitle: 'Making your first steps',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Ina Volkov',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
    ],
  },
  {
    slug: 'marketing-module-category',
    icon: 'ph:megaphone-simple-duotone',
    iconColor: 'info',
    name: 'Marketing Module',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Mike Wilson',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
      {
        name: 'Eddie Bricks',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
      {
        name: 'Jake Rowland',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
    ],
    articles: [
      {
        slug: 'collecting-campaign-audience',
        title: 'Collecting campaign audience',
        subtitle: 'Learn how to make people subscribe',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one day ago',
        author: {
          name: 'Mike Wilson',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'creating-customer-segments',
        title: 'Creating customer segments',
        subtitle: 'Learn more about customer segmentation',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: '2 weeks ago',
        author: {
          name: 'Mike Wilson',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'run-your-first-campaign',
        title: 'Run your first campaign',
        subtitle: 'Run your first mailing campaign',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Eddie Bricks',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'creating-a-custom-template',
        title: 'Creating a custom template',
        subtitle: 'Create a custom email template with your own elements',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Jake Rowland',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
    ],
  },
  {
    slug: 'production-module-category',
    icon: 'ph:factory-duotone',
    iconColor: 'warning',
    name: 'Production Module',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Sara Gheller',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
    ],
    articles: [
      {
        slug: 'creating-a-production-unit',
        title: 'Creating a production unit',
        subtitle: 'Learn how to create and manage a production unit',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one hour ago',
        author: {
          name: 'Sara Gheller',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'creating-a-supply-chain',
        title: 'Creating a supply chain',
        subtitle: 'Learn how to create and manage a supply chain',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one day ago',
        author: {
          name: 'Sara Gheller',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
    ],
  },
  {
    slug: 'delivery-module-category',
    icon: 'ph:truck-duotone',
    iconColor: 'purple',
    name: 'Delivery Module',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Jake Rowland',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
      {
        name: 'Edwin Tyler',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
      {
        name: 'Helen Miller',
        picture: '/assets/demo/img/avatar/25.jpg',
      },
    ],
    articles: [
      {
        slug: 'creating-your-fleet',
        title: 'Creating your fleet',
        subtitle: 'Create your fleet and set global rules',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: '5 days ago',
        author: {
          name: 'Helen Miller',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'adding-vehicles',
        title: 'Adding vehicles',
        subtitle: 'Dive in fleet vehicle management',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Jake Rowland',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
      {
        slug: 'track-your-fleet',
        title: 'Track your fleet',
        subtitle: "Learn more on how to track your fleet's performance",
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: '8 hours ago',
        author: {
          name: 'Edwin Tyler',
          picture: '/assets/demo/img/avatar/25.jpg',
        },
        content: markdownObject,
      },
    ],
  },
]

export const helpCenterTopics = [
  {
    icon: 'ph:files-duotone',
    iconColor: 'primary',
    title: 'Documentation',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: '/',
  },
  {
    icon: 'ph:atom-duotone',
    iconColor: 'success',
    title: 'User Guides',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: '/',
  },
  {
    icon: 'ph:swap-duotone',
    iconColor: 'secondary',
    title: 'API',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: '/',
  },
  {
    icon: 'ph:circles-three-duotone',
    iconColor: 'warning',
    title: 'Components',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: '/',
  },
]






export const boxedPosts = [
  {
    id: 0,
    image: '/assets/posts/boxed-1.png',
    title: 'Our customer / seller program',
    slug: 'our-customer-seller-program',
    abstract:
      "We're here to build the world's most trusted and inclusive NFT marketplace as well as a capacity to...",
    category: 'marketplace',
    date: 'March 17th, 2022',
    content:
      '<p> Today, investing in advertising is part of the cost of doing business, but if performance takes a while to materialize, it could put you in a hole that’s difficult to dig out of. Many small businesses come to Vulk to solve this exact problem – to improve their ads performance as they begin ramping up their spend on Amazon ads. </p><h2 class="title is-3"> Value of the Vulk bidder for small businesses </h2> <p> A new analysis shows why more and more brands are moving towards Vulk and our advanced bidding engine. Vulk’ software helps the vast majority of sellers drive dramatically more revenue in a matter of months, even if their advertising activity prior to coming to Vulk was low or non-existent. </p><p> Hundreds of sellers signed up for Vulk last year having spent $315 or less on advertising in the prior 60 days. </p><p> Just 60 days after turning on Vulk and our bidding technology, those same sellers experienced median sales jumps of more than 24X from the previous period. </p><p> For smaller sellers, this analysis shows how Vulk software can put you in the best position to scale your advertising on Amazon, and improve sales dramatically, without sacrificing time or efficiency. Even if you are new to advertising on Amazon, our software and bidding technology can help take you to the next level, and make the most out of your investment. </p><h2 class="title is-3">Methodology</h2> <p> This analysis is restricted to 350 Amazon sellers using Vulk for the first time in 2020. The data examined spans both the 60 days prior to using Vulk, along with the first 60 days using the platform and associated bidder. For ease of comparison, sellers were grouped according to their pre-Vulk advertising spend amounts. See the companion study for data on larger brands. </p>',
  },
  {
    id: 1,
    image: '/assets/posts/boxed-2.png',
    title: '10 tips to avoid being flagged',
    slug: '10-tips-to-avoid-being-flagged',
    abstract:
      'NFTs are one of the greatest blockchain applications of today. Discover how to optimize your business and...',
    category: 'marketplace',
    date: 'March 17th, 2022',
    content:
      '<p> Today, investing in advertising is part of the cost of doing business, but if performance takes a while to materialize, it could put you in a hole that’s difficult to dig out of. Many small businesses come to Vulk to solve this exact problem – to improve their ads performance as they begin ramping up their spend on Amazon ads. </p><h2 class="title is-3"> Value of the Vulk bidder for small businesses </h2> <p> A new analysis shows why more and more brands are moving towards Vulk and our advanced bidding engine. Vulk’ software helps the vast majority of sellers drive dramatically more revenue in a matter of months, even if their advertising activity prior to coming to Vulk was low or non-existent. </p><p> Hundreds of sellers signed up for Vulk last year having spent $315 or less on advertising in the prior 60 days. </p><p> Just 60 days after turning on Vulk and our bidding technology, those same sellers experienced median sales jumps of more than 24X from the previous period. </p><p> For smaller sellers, this analysis shows how Vulk software can put you in the best position to scale your advertising on Amazon, and improve sales dramatically, without sacrificing time or efficiency. Even if you are new to advertising on Amazon, our software and bidding technology can help take you to the next level, and make the most out of your investment. </p><h2 class="title is-3">Methodology</h2> <p> This analysis is restricted to 350 Amazon sellers using Vulk for the first time in 2020. The data examined spans both the 60 days prior to using Vulk, along with the first 60 days using the platform and associated bidder. For ease of comparison, sellers were grouped according to their pre-Vulk advertising spend amounts. See the companion study for data on larger brands. </p>',
  },
]

export const genericFaq = [
  {
    title: 'How does it work?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis est tam dissimile homini. Quae diligentissime contra Aristonem dicuntur a Chryippo. Qua tu etiam inprudens utebare non numquam. Paria sunt igitur. Idemne, quod iucunde.',
  },
  {
    title: "What's included with membership?",
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis est tam dissimile homini. Quae diligentissime contra Aristonem dicuntur a Chryippo. Qua tu etiam inprudens utebare non numquam. Paria sunt igitur. Idemne, quod iucunde.',
  },
  {
    title: 'All the free API services really unlimited?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis est tam dissimile homini. Quae diligentissime contra Aristonem dicuntur a Chryippo. Qua tu etiam inprudens utebare non numquam. Paria sunt igitur. Idemne, quod iucunde.',
  },
  {
    title: 'How does billing work?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis est tam dissimile homini. Quae diligentissime contra Aristonem dicuntur a Chryippo. Qua tu etiam inprudens utebare non numquam. Paria sunt igitur. Idemne, quod iucunde.',
  },
  {
    title: 'Can I sign up for dedicated support?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis est tam dissimile homini. Quae diligentissime contra Aristonem dicuntur a Chryippo. Qua tu etiam inprudens utebare non numquam. Paria sunt igitur. Idemne, quod iucunde.',
  },
  {
    title: 'How do I upgrade my account?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis est tam dissimile homini. Quae diligentissime contra Aristonem dicuntur a Chryippo. Qua tu etiam inprudens utebare non numquam. Paria sunt igitur. Idemne, quod iucunde.',
  },
]







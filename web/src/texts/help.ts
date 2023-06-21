import { markDocsWelcome } from '/@src/texts/help/docs/welcome'

import { markdownEcommerce } from '/@src/texts/help/docs/ecommerce'
import { markdownWeb } from '/@src/texts/help/docs/web'

export const markdownObject = ``

export const textHelp = {
  title: 'Centro de ayuda',
  subtitle: 'Nuestros recursos',
  text: `Tenemos materiales para ayudar a configurar tu proyecto y comenzar lo más rápido posible.`,
}

export const textHelpCenter = {
  title: 'Categorías de ayuda',
  subtitle: 'Echa un vistazo a',
}

export const helpCenterTopics = [
  {
    icon: 'ph:files-duotone',
    iconColor: 'primary',
    title: 'Documentación',
    text: 'Perfecta para desarrolladores e integrar Aythen de forma simple.',
    link: 'docs',
  },
  {
    icon: 'ph:atom-duotone',
    iconColor: 'success',
    title: 'Reseller',
    text: 'Vende nuestros servicios a través de nuestro programa de foramción.',
    link: 'reseller',
  },
  {
    icon: 'ph:pencil',
    iconColor: '#0000ff',
    title: 'Web',
    text: 'Expansión de la presencia en internet de la PYME mediante la creación de una página web y/o la prestación de servicios que proporcionen posicionamiento básico en internet.',
    link: 'web',
  },
  {
    link: 'shop',
    icon: 'ph:storefront',
    iconColor: '#13d33b',
    title: 'shop',
    text: 'Creación de una tienda online de compraventa de productos y/o servicios que utilice medios digitales para su intercambio.',
  },
  {
    icon: 'ph:funnel',
    iconColor: '#fff343',
    title: 'SEO/SEM',
    text: 'Aumento del alcance de potenciales clientes e incrementando el tráfico de visitas en su/-s plataforma/-s.',
    link: 'seo',
  },
  {
    icon: 'ph:chat-circle',
    iconColor: '#d21643',
    title: 'Redes Sociales',
    text: 'Promociona tus redes sociales con herramientas automaziadas para gestionar, monitorizar y analizar tus posts, interacciones y estrategias.',
    link: 'social',
  },
  {
    icon: 'ph:users',
    iconColor: '#ffa726',
    title: 'CRM',
    text: 'Digitaliza y optimiza la gestión de las relaciones comerciales con los clientes, desde la creación hasta la fidelización.',
    link: 'crm',
  },
  {
    icon: 'ph:headset',
    iconColor: '#d216ff',
    title: 'Oficina Virtual',
    text: 'Implantar soluciones interactivas y funcionales que permitan la colaboración más eficiente entre los trabajadores de las empresas beneficiarias.',
    link: 'office',
  },
]

export const helpDocumentation = [
  {
    slug: 'welcome-category',
    icon: 'ph:hand-waving-duotone',
    iconColor: 'yellow',
    name: 'Welcome Docsss',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Edwins Tyler',
        picture: '/assets/demo/img/avatar/19.jpg',
      }
    ],
    articles: [
      {
        slug: 'making-your-first-steps',
        title: 'Getting started Docs',
        subtitle: 'Making your first steps with our application',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Jake Rowland',
          picture: '/assets/demo/img/avatar/17.jpg',
        },
        content: markDocsWelcome,
      },
    ],
  }
]


export const helpReseller = []


export const helpWeb = [
  {
    slug: 'web-category',
    icon: 'ph:hand-waving-duotone',
    iconColor: 'yellow',
    name: 'Welcome',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Edwin Tyler',
        picture: '/assets/demo/img/avatar/19.jpg',
      }
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
          picture: '/assets/demo/img/avatar/17.jpg',
        },
        content: markdownWeb,
      }
    ],
  }
]


export const helpEcommerce = [
  {
    slug: 'ecommerce-category',
    icon: 'ph:hand-waving-duotone',
    iconColor: 'yellow',
    name: 'Welcome',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Edwin Tyler',
        picture: '/assets/demo/img/avatar/19.jpg',
      }
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
          picture: '/assets/demo/img/avatar/17.jpg',
        },
        content: markdownEcommerce,
      }
    ],
  }
]


export const helpSEO = [
  {
    slug: 'seo-category',
    icon: 'ph:hand-waving-duotone',
    iconColor: 'yellow',
    name: 'Welcome',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Edwin Tyler',
        picture: '/assets/demo/img/avatar/19.jpg',
      }
    ],
    articles: [],
  }
]


export const helpSocial = [
  {
    slug: 'social-category',
    icon: 'ph:hand-waving-duotone',
    iconColor: 'yellow',
    name: 'Welcome',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Edwin Tyler',
        picture: '/assets/demo/img/avatar/19.jpg',
      }
    ],
    articles: [],
  },
]


export const helpCRM = [
  {
    slug: 'crm-category',
    icon: 'ph:hand-waving-duotone',
    iconColor: 'yellow',
    name: 'Welcome',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Edwin Tyler',
        picture: '/assets/demo/img/avatar/19.jpg',
      }
    ],
    articles: [],
  }
]


export const helpOffice = [
  {
    slug: 'office-category',
    icon: 'ph:hand-waving-duotone',
    iconColor: 'yellow',
    name: 'Welcome',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
    contributors: [
      {
        name: 'Edwin Tyler',
        picture: '/assets/demo/img/avatar/19.jpg',
      }
    ],
    articles: [],
  }
]




export const helpCategories = {
  'docs': helpDocumentation,
  'reseller': helpReseller,
  'web': helpWeb,
  'ecommerce': helpEcommerce,
  //'seo': helpSEO,
  //'social': helpSocial,
  //'crm': helpCRM,
  //'office': helpOffice
}

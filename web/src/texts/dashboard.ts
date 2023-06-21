import { link } from '/@src/texts/link'

export const header = {
  home_0: 'Kit Digital',
  home_2: 'Equipo',
  home_3: 'Home',
  home_4: 'Servicios',
  home_5: 'Ayuda',
  button: {
    label: 'Login',
    link: link.login
  }
}

export const LanguageMegamenu = {
  title: 'Language',
  subtitle: 'Estamos creciendo para tener presencia en todo el mundo',
  data: [
    { flag: 'https://flagcdn.com/us.svg', language: 'English', subtitle: 'We are growing to have a presence worldwide', tag: 'en' },
    { flag: 'https://flagcdn.com/fr.svg', language: 'Français', subtitle: 'Nous grandissons pour être présents dans le monde entier', tag: 'fr' },
    { flag: 'https://flagcdn.com/es.svg', language: 'Español', subtitle: 'Estamos creciendo para tener presencia en todo el mundo', tag: 'es' },
    { flag: 'https://flagcdn.com/it.svg', language: 'Italiano', subtitle: 'Stiamo crescendo per avere una presenza in tutto il mondo', tag: 'it' },
    { flag: 'https://flagcdn.com/ie.svg', language: 'Irish', subtitle: 'Táimid ag fás chun bheith i láthair ar fud an domhain', tag: 'ga' },
    { flag: 'https://flagcdn.com/ro.svg', language: 'Română', subtitle: 'Crestem pentru a avea o prezenta globala', tag: 'ro' },

    { flag: 'https://flagcdn.com/de.svg', language: 'Deutsch', subtitle: 'Wir wachsen, um weltweit präsent zu sein', tag: 'de' },
    { flag: 'https://flagcdn.com/bg.svg', language: 'български', subtitle: 'Растем, за да имаме присъствие в цял ​​свят', tag: 'bg' },
    { flag: 'https://flagcdn.com/cz.svg', language: 'čeština', subtitle: 'Rosteme, abychom měli přítomnost po celém světě', tag: 'cs' },
    { flag: 'https://flagcdn.com/hr.svg', language: 'hrvatski', subtitle: 'Rastemo da bismo imali prisutnost diljem svijeta', tag: 'hr' },
    { flag: 'https://flagcdn.com/dk.svg', language: 'Dansk', subtitle: 'Vi vokser for at have tilstedeværelse over hele verden', tag: 'da' },
    { flag: 'https://flagcdn.com/sk.svg', language: 'slovenčina', subtitle: 'Rastieme, aby sme mali prítomnosť po celom svete', tag: 'sk' },
    { flag: 'https://flagcdn.com/sl.svg', language: 'slovenščina', subtitle: 'Rastemo, da bomo imeli prisotnost po vsem svetu', tag: 'sl' },
    { flag: 'https://flagcdn.com/et.svg', language: 'eesti', subtitle: 'Kasvame, et olla kohal kogu maailmas', tag: 'et' },
    { flag: 'https://flagcdn.com/fi.svg', language: 'suomi', subtitle: 'Kasvamme ollaksemme läsnä kaikkialla maailmassa', tag: 'fi' },
    { flag: 'https://flagcdn.com/gr.svg', language: 'Ελληνικά', subtitle: 'Μεγαλώνουμε για να έχουμε παρουσία σε όλο τον κόσμο', tag: 'el' },
    { flag: 'https://flagcdn.com/hu.svg', language: 'magyar', subtitle: 'Növekszünk, hogy jelenlétet szerezzenek az egész világon', tag: 'hu' },
    { flag: 'https://flagcdn.com/lv.svg', language: 'Latviešu', subtitle: 'Mēs augam, lai būtu klātbūtne visā pasaulē', tag: 'lv' },
    { flag: 'https://flagcdn.com/lt.svg', language: 'Lietuvių', subtitle: 'Mes augame, kad turėtume buvimą visame pasaulyje', tag: 'lt' },
    { flag: 'https://flagcdn.com/mt.svg', language: 'Malti', subtitle: 'Qed inħawlu biex ikunu preżenti madwar id-dinja', tag: 'mt' },
    { flag: 'https://flagcdn.com/nl.svg', language: 'Nederlands', subtitle: 'We groeien om overal ter wereld aanwezig te zijn', tag: 'nl' },
    { flag: 'https://flagcdn.com/pl.svg', language: 'Polski', subtitle: 'Rozwijamy się, aby być obecnymi na całym świecie', tag: 'pl' },
    { flag: 'https://flagcdn.com/pt.svg', language: 'Português', subtitle: 'Estamos crescendo para ter presença em todo o mundo', tag: 'pt' },

    { flag: 'https://flagcdn.com/se.svg', language: 'Svenska', subtitle: 'Vi växer för att ha närvaro över hela världen', tag: 'sv' },
]}

export const LanguageFlags = LanguageMegamenu.data.reduce((obj, item) => ({...obj, [item.tag]: item.flag}), {});
export const LanguageText = LanguageMegamenu.data.reduce((obj, item) => ({...obj, [item.tag]: item.language}), {});

export const ServicesMegamenu = {
  title: 'Kit Digital',
  subtitle: `Elige el Kit Digital entre 6 herramientas imprescindibiles para tu negocio.`,
  button: {
    label: 'Solicitar Kit Digital',
    link: link.login
  },
  data: [
    {
      icon: 'ph:pencil',
      iconColor: '#0000ff',
      title: 'WEB',
      content: `Preséntate y edita tu web`,
      tag:'web',
      to: '/tool/web',
    },
    {
      icon: 'ph:storefront',
      iconColor: '#13d33b',
      title: 'SHOP',
      tag:'ecommerce',
      content: `Vende productos y servicios`,
      to: '/tool/shop',
    },
    {
      icon: 'ph:funnel',
      iconColor: '#fff343',
      title: 'SEO',
      tag:'seo',
      content: `Posicionamiento avanzado`,
      to: '/tool/seo',
    },
    {
      icon: 'ph:chat-circle',
      iconColor: '#d21643',
      title: 'RRSS',
      tag:'social',
      content: `Gestión, monitorización y análisis`,
      to: '/tool/rrss',
    },
    {
      icon: 'ph:headset',
      iconColor: '#d216ff',
      title: 'OFFICE',
      tag:'office',
      content: `Teletrabaja desde donde quieras`,
      to: '/tool/office',
    },{
      icon: 'ph:users',
      iconColor: '#ffa726',
      title: 'CRM',
      tag:'crm',
      content: `Organiza y gestiona tus clientes`,
      to: '/tool/crm',
    },
  ],
}

export const EditorMegamenu = {
  title: 'Servicios Aythen',
  subtitle: `Encuentra y/o encarga la aplicación perfecta para tu línea de negocio.`,
  label_0: 'Components',
  label_1: 'Apps',
  title_1: 'Aythen API',
  text_1: `Más de 50 integraciones APIs de terceros listas de usar para tu negocio.`,
  link_1: 'Acceso ahora',
  data: [
    {
      title: 'get-started',
      to: '/services',
    },
    {
      title: 'base-component',
      to: '/wait',
    },
    {
      title: 'reusable',
      to: '/wait',
    },
    {
      title: 'advanced',
      to: '/wait',
    },
    {
      title: 'ecommerce-delivery',
      to: '/wait',
    },
    {
      title: 'car-book',
      to: '/wait',
    },
    {
      title: 'service-provider',
      to: '/wait',
    },
    {
      title: 'other-apps',
      to: '/wait',
    }
  ],
  
  



  data1: [
    {
      title: 'Coorporativas',
      to: '/services?id=t0',
    },
    {
      title: 'E-commerce',
      to: '/services?id=t1',
    },
    {
      title: 'Business',
      to: '/services?id=t2',
    },
    {
      title: 'Blogs',
      to: '/services?id=t3',
    },
    {
      title: 'Marketing',
      to: '/services?id=t6',
    },
    
    
    
    {
      title: 'Voice',
      to: '/services?id=c6',
    },
    {
      title: 'Image & Video',
      to: '/services?id=c4',
    },
    {
      title: 'Creación de contenido',
      to: '/services?id=c3',
    },
    {
      title: 'Creación de medios',
      to: '/services?id=c2',
    }
  ],
}





export const AythenMegamenu = {
  title: 'Aythen Home',
  subtitle: `Aythen ofrece todas las herramientas para crecer tu negocio online.`,
  to: '/kit+digital',
  button: {
    label: 'Más información',
    link: link.help
  },
  label_0: 'Home',
  label_1: 'Enlaces',
  label_2: 'Support',
  text_1: `Una plataforma XaaS para ofrecer cualquier cosa como servicio.`,
  data: [
    { title: 'aythen', to: '/home' },
    { title: 'digital-kit', to: '/kit+digital' },
    //{ title: 'services', to:'/prompts'},
    //{ title: 'clients', to: '/client' },
    { title: 'terms', to: '/terms' },
    { title: 'resellers', to: '/team/reseller' },
    { title: 'Freelancers', to: '/team/jobs' },
    { title: 'plans', to: '/pricing', },
    { title: 'calculator', to: '/grant'},
    
    
    
   /* {
      title: 'Wallet',
      to: '/bi',
    },
    */
    
  ],
  support: [{
    title: 'need-web',
    to: '/help/article/web-basis',
  },{
    title: 'need-ecommerce',
    to: '/help/article/shop-basis',
  },{
    title: 'need-seo',
    to: '/help/article/seo-basis',
  },{
    title: 'need-other',
    to: '/help',
  }]
}

export const CooworkingMegamenu = {
  title: 'Aythen Team',
  subtitle: `Crea tu proyecto específico en Aythen para que profesionales trabajen en él.`,
  text_1: `Descubre nuestra formación online sobre nuevas tecnologías.`,
  button: [{
    label: 'Equipo',
    link: link.team
  },{
    label: 'Freelancer',
    link: link.freelancer
  }],
  data: [{
    title: 'Websites & Software',
    data: [{
      title: 'soft-arch',
      to: '/team/freelancer?category=sitio web y software&subCategory=Arquitectura de software',
    },{
      title: 'web-dev',
      to: '/team/freelancer?category=sitio web y software&subCategory=Desarrollo web',
    },{
      title: 'game-dev',
      to: '/team/freelancer?category=sitio web y software&subCategory=Desarrollo de juegos',
    },{
      title: 'ia',
      to: '/team/freelancer?category=sitio web y software&subCategory=Inteligencia artificial',
    }]
  },{
    title: 'design-media',
    data: [{
      title: 'design-graphic',
      to: '/team/freelancer?category=diseño, medios&subCategory=Diseño gráfico',
    },
    {
      title: 'design-web',
      to: '/team/freelancer?category=diseño, medios&subCategory=Diseño de sitios web',
    },
    {
      title: 'design-logo',
      to: '/team/freelancer?category=diseño, medios&subCategory=Diseño de logotipos',
    },
    {
      title: 'illustrator',
      to: '/team/freelancer?category=diseño, medios&subCategory=Illustrator',
    }]
  },{
    title: 'writing-content',
    data: [{
      title: 'article-writing',
      to: '/team/freelancer',
    },
    {
      title: 'content-writing',
      to: '/team/freelancer',
    },
    {
      title: 'research-writing',
      to: '/team/freelancer',
    },
    {
      title: 'copywriting',
      to: '/team/freelancer',
    }]
  },{
    title: 'data-entry',
    data: [{
      title: 'data-processing',
      to: '/team/freelancer?category=entrada de datos&subCategory=Procesamiento de datos',
    },
    {
      title: 'customer-support',
      to: '/team/freelancer?category=entrada de datos&subCategory=Soporte al cliente',
    },
    {
      title: 'ms-office',
      to: '/team/freelancer?category=entrada de datos&subCategory=Microsoft Office',
    },
    {
      title: 'general-office',
      to: '/team/freelancer?category=entrada de datos&subCategory=Oficina general',
    }]
  }]
}



export const footer = {
  text: `La filosofía de Aythen es ser ultra modular. Optimizado en cada caso, siendo una puerta de acceso web.`,
  label: '2023 Aythen. All rights reserved.',
  rrs: [
    {
      name: 'Instagram',
      url: 'https://instagram.com/aythen.eu',
      icon: 'fa:instagram',
    },{
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/aythen-company/',
      icon: 'fa:linkedin',
    },
    {
      name: 'Facebook',
      url: 'https://instagram.com/aythen.eu',
      icon: 'fa:facebook',
    },
    {
      name: 'Telegram',
      url: 'https://instagram.com/aythen.eu',
      icon: 'fa:telegram',
    },{
      name: 'Youtube',
      url: 'https://www.youtube.com/channel/UCHHiSuZ8TraiGtgB5UWxQyQ',
      icon: 'fa:youtube',
    }
  ],
  links: [
    {
      title: 'Aythen',
      data: [
        {
          title: 'Home',
          link: '/',
        },
        {
          title: 'Kit Digital',
          link: '/kit+digital',
        },
        {
          title: 'Clientes',
          link: '/client',
        },
        {
          title: 'Reseller',
          link: '/reseller',
        }
      ],
    },
    {
      title: 'Servicios',
      data: [{
          title: 'WEB',
          link: '/tool/web',
        },{
          title: 'SHOP',
          link: '/tool/shop',
        },{
          title: 'SEO',
          link: '/tool/seo',
        }],
    },{
      title: 'Servicios',
      data: [{
          title: 'RRSS',
          link: '/tool/rrss',
        },{
          title: 'OFFICE',
          link: '/tool/office',
        },{
          title: 'CRM',
          link: '/tool/crm',
        }],
    },
    {
      title: 'Business',
      data: [
        /*{
          title: 'Planes',
          link: '/pricing',
      },*/{
          title: 'Calculadora',
          link: '/grant',
      },{
          title: 'Support',
          link: '/help',
      },{
          title: 'Team',
          link: '/wait',
      },{
          title: 'Términos',
          link: '/terms',
      }],
    }
  ],
}



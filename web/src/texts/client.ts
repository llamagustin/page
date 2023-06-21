import type { HeroStack } from '/@src/components/layout/hero/modules/HeroStacks.vue'

export const textHeroT1 = {
  title_1: 'AYTHEN.',
  title_2: 'Clientes',
  title_3: 'Aythen.',
  text: `Ayudamos a integrar el Kit Digital en nuestros clientes de forma simple para mejorar la gestión y la eficiencia a través de la nube`,
  button: [{
    label: 'Kit Digital',
    link: '/kit+digital'
  },{
    label: 'Aythen Home',
    link: '/home'
  }]
}

export const textTimeLineTitle = [
  {
    title: 'TU NEGOCIO',
    subtitle: 'Crea y adapta',
    minititle: 'En 3 pasos',
    paragraph_1: `A las herramientas del Kit Digital, las cuales se actualizan constantemente en I+D para que estés al día con nuevas versiones al nivel de tu negocio.`,
    paragraph_2: `Para introducir las nuevas tecologías a través de nuestro coworking donde profesionales técnicos ofrecen soporte para resolver tus necesidades.`,
  },
  {
    title: 'Aythen se expande',
    subtitle: 'Crece y suma',
    minititle: 'Siguiente etapa',
    paragraph_1: `Cada cliente de tu negocio te aporta mucho valor, cada nuevo dato se sincroniza con cada una de las 6 herramientas del kit digital para ofrecerte una experiencia completa de tus datos.`,
    paragraph_2: `Ofrecemos una forma de hacer llegar el Kit Digital a los negocios cubriendo cada una de sus necesidades a través de nuestros resellers y material didáctico.`,
  },
  {
    title: 'Estás abierto al mundo',
    subtitle: 'Ahora',
    paragraph_1: `Con las herramientas del Kit Digital podrás escoger mejor tus prioridades para
                    digitalizar las diferentes partes de tu negocio.`,
    paragraph_2: `Esto implica una mayor capacidad de alcance para visibilizarte a todos los cientes potenciales y, por tanto, posibles beneficios.`,
  },
  {
    title: 'ESTO FUERA',
    subtitle: 'Explore',
    minititle: 'Start your Journey',
    paragraph_1: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nonne videmus quanta perturbatio rerum omnium consequatur,
                    quanta confusio? Recte, inquit, intellegis. Quod autem
                    ratione actum est, id officium appellamus.`,
    paragraph_2: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nonne videmus quanta perturbatio rerum omnium consequatur,
                    quanta confusio? Recte, inquit, intellegis. Quod autem
                    ratione actum est, id officium appellamus.`,
  },
  {
    title: 'La ventana al mundo',
    subtitle: 'La web como básico',
  },
]


export const textDevWindows = {
  title_1: '6 herramientas en 1 plataforma',
  text_1: `Ofrecemos 6 herramientas completas para digitalizar las 6 áreas digitales más importantes de tu negocio.`,
  title_2: 'Servicio todo incluído',
  text_2: `Ofrecemos servicio de creación, mantenimiento y actualizaciones de tu software al ser cliente de Aythen.`,
  title_3: 'Integraciones rápidas',
  text_3: `Nuestra filosofía es dar a nuestros clientes el poder de la conexión API entre softwares e Internet.`,
  title_4: 'Puedes subvencionarte',
  text_4: `Aythen te ayuda a subvencionar tus servicios digitales a través de financiaciones para tu negocio.`,
}

export const textGlobeStats = [
  {
    label: 'Clientes',
    number: 40,
    unity: '+',
  },
  {
    label: 'Países',
    number: 5,
    unity: '+',
  },
  {
    label: 'Data Servers',
    number: 250,
    unity: 'TB',
  },
  {
    label: 'Idiomas',
    number: 3,
    unity: '+',
  },
]

export const textDualBox = {
  left: {
    title: 'Import a Repository',
    text: `Select a Git provider to import an existing project from a Git
                  Repository.`,
    button_0: 'Continue with GitHub',
    button_1: 'Continue with Gitlab',
    button_2: 'Continue with Bitbucket',
    label: 'Use another provider',
  },
  right: {
    title: 'Start with a Template',
    label: 'See all templates',
  },
}

export const heroStacks: HeroStack[] = [
  {
    id: 0,
    picture: '/assets/stacks/js.svg',
    orientation: 'left',
    order: 1,
    size: '',
  },
  {
    id: 1,
    picture: '/assets/stacks/sass-light.svg',
    orientation: 'left',
    order: 2,
    size: 'medium',
  },
  {
    id: 2,
    picture: '/assets/stacks/vuejs-light.svg',
    orientation: 'left',
    order: 3,
    size: 'large',
  },
  {
    id: 3,
    picture: '/assets/stacks/vscode-light.svg',
    orientation: 'left',
    order: 4,
    size: 'big',
  },
  {
    id: 4,
    picture: '/assets/stacks/reactjs-light.svg',
    orientation: 'left',
    order: 5,
    size: '',
  },
  {
    id: 5,
    picture: '/assets/stacks/typescript-light.svg',
    orientation: 'left',
    order: 6,
    size: 'medium',
  },
  {
    id: 6,
    picture: '/assets/stacks/docker-light.svg',
    orientation: 'left',
    order: 7,
    size: 'large',
  },
  {
    id: 7,
    picture: '/assets/stacks/bulma-light.svg',
    orientation: 'left',
    order: 8,
    size: 'medium',
  },
  {
    id: 8,
    picture: '/assets/stacks/html5-light.svg',
    orientation: 'right',
    order: 1,
    size: '',
  },
  {
    id: 9,
    picture: '/assets/stacks/swift-light.svg',
    orientation: 'right',
    order: 2,
    size: 'medium',
  },
  {
    id: 10,
    picture: '/assets/stacks/alpinejs-light.svg',
    orientation: 'right',
    order: 3,
    size: 'large',
  },
  {
    id: 11,
    picture: '/assets/stacks/nuxt-light.svg',
    orientation: 'right',
    order: 4,
    size: 'big',
  },
  {
    id: 12,
    picture: '/assets/stacks/android.svg',
    orientation: 'right',
    order: 5,
    size: '',
  },
  {
    id: 13,
    picture: '/assets/stacks/nodejs-light.svg',
    orientation: 'right',
    order: 6,
    size: 'medium',
  },
  {
    id: 14,
    picture: '/assets/stacks/flutter-light.svg',
    orientation: 'right',
    order: 7,
    size: 'large',
  },
  {
    id: 15,
    picture: '/assets/stacks/next-light.svg',
    orientation: 'right',
    order: 8,
    size: 'medium',
  },
]

export const productStacks = [
  {
    url: '/assets/images/kit-digital/web.png',
    name: 'Regístrate',
    squared: false,
    position: 'con el test inicial',
    description: 'para solicitar la ayuda',
  },
  {
    url: '/assets/images/kit-digital/ecommerce.png',
    name: 'Paciencia',
    squared: false,
    position: 'Semanas a meses',
    description: 'las cosas de palacio van despacio.',
  },
  {
    url: '/assets/images/kit-digital/bi.png',
    name: 'Aprobad@',
    position: 'emisión de factura',
    description: 'y elección de servicio específico.',
  },
  {
    url: '/assets/images/kit-digital/gestion.png',
    name: 'Diseño',
    squared: false,
    position: 'para encontrar la sintonía',
    description: 'y resolver a medida tu necesidad.',
  },
  {
    url: '/assets/images/kit-digital/cloud.png',
    name: 'Un año',
    squared: false,
    position: 'de servicio incluído',
    description: 'con manenimiento básico anual',
  },
]

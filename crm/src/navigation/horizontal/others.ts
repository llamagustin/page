export default [
  {
    title: 'Otros',
    icon: { icon: 'tabler-dots' },
    children: [
      {
        title: 'Control de Acceso',
        icon: { icon: 'tabler-shield' },
        to: 'access-control',
        action: 'read',
        subject: 'Auth',
      },
      {
        title: 'Nav Levels',
        icon: { icon: 'tabler-menu-2' },
        children: [
          {
            title: 'Level 2.1',
            to: null,
          },
          {
            title: 'Level 2.2',
            children: [
              {
                title: 'Level 3.1',
                to: null,
              },
              {
                title: 'Level 3.2',
                to: null,
              },
            ],
          },
        ],
      },
      {
        title: 'Deshabilitar Menú',
        to: null,
        icon: { icon: 'tabler-eye-off' },
        disable: true,
      },
      {
        title: 'Buscar Soporte',
        href: 'https://pixinvent.ticksy.com/',
        icon: { icon: 'tabler-lifebuoy' },
        target: '_blank',
      },
      {
        title: 'Documentación',
        href: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/',
        icon: { icon: 'tabler-file' },
        target: '_blank',
      },
    ],
  },
]

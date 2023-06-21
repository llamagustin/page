
const tools = JSON.parse(localStorage.dataTools) || []
  


export const analytics = [
  {
    name: 'Tráfico',
    slideImg: tools[0].image,
    title: tools[0].title,
    subtitle: tools[0].subtitle,
    data: [
      {
        quantity: 0,
        text: 'accepted',
      },
      {
        quantity: 0,
        text: 'pending',
      },
      {
        quantity: 0,
        text: 'totalMoney',
      },
      {
        quantity: 0,
        text: 'pendingMoney',
      },
    ],
  },
  {
    name: 'Gasto',
    slideImg: tools[1].image,
    title: tools[1].title,
    subtitle: tools[1].subtitle,
    data: [
      {
        quantity: 0,
        text: 'Gastado',
      },
      {
        quantity: 0,
        text: 'Pedidos',
      },
      {
        quantity: 0,
        text: 'Pedidos',
      },
      {
        quantity: 0,
        text: 'Items',
      },
    ],
  },
  {
    name: 'Fuentes de Ingresos',
    slideImg: tools[2].image,
    title: tools[2].title,
    subtitle: tools[2].subtitle,
    data: [
      {
        quantity: 0,
        text: 'Directo',
      },
      {
        quantity: 0,
        text: 'Orgánico',
      },
      {
        quantity: 0,
        text: 'Por referencia',
      },
      {
        quantity: 0,
        text: 'Campaña',
      },
    ],
  },
  {
    name: 'Fuentes de Ingresos',
    slideImg: tools[3].image,
    title: tools[3].title,
    subtitle: tools[3].subtitle,
    data: [
      {
        quantity: 0,
        text: 'accepted',
      },
      {
        quantity: 0,
        text: 'pending',
      },
      {
        quantity: 0,
        text: 'totalMoney',
      },
      {
        quantity: 0,
        text: 'pendingMoney',
      },
    ],
  },
  {
    name: 'Fuentes de Ingresos',
    slideImg: tools[4].image,
    title: tools[4].title,
    subtitle: tools[4].subtitle,
    data: [
      {
        quantity: 0,
        text: 'Directo',
      },
      {
        quantity: 0,
        text: 'Orgánico',
      },
      {
        quantity: 0,
        text: 'Por referencia',
      },
      {
        quantity: 0,
        text: 'Campaña',
      },
    ],
  },
  {
    name: 'Fuentes de Ingresos',
    slideImg: tools[5].image,
    title: tools[5].title,
    subtitle: tools[5].subtitle,
    data: [
      {
        quantity: 0,
        text: 'Directo',
      },
      {
        quantity: 0,
        text: 'Orgánico',
      },
      {
        quantity: 0,
        text: 'Por referencia',
      },
      {
        quantity: 0,
        text: 'Campaña',
      },
    ],
  },
]



export const statisticsVertical = {
  title: 'Total leads acceptados',
  color: 'success',
  icon: 'tabler-users',
  stats: '97.5k',
  height: 120,
  series: [
    {
      data: [300, 350, 330, 380, 340, 400, 380],
    },
  ],
  chartOptions: {
    chart: {
      height: 110,
      type: 'area',
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    tooltip: {
      enabled: false,
    },
    markers: {
      colors: 'transparent',
      strokeColors: 'transparent',
    },
    grid: {
      show: false,
    },
    colors: ['#28C76F'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      show: true,
      lines: {
        show: false,
      },
      labels: {
        show: false,
      },
      stroke: {
        width: 0,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      stroke: {
        width: 0,
      },
      show: false,
    },
  },
}
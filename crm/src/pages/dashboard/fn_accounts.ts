import axios from '@axios';
const instance = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});



export const useDashboardAccounts = async () => {
    const tools = JSON.parse(localStorage.dataTools) || []
    
    const result = await instance.get('/dashboard/account').then(res => res.data)
      
    const analytics = [
      {
        name: 'Tráfico',
        slideImg: tools[0].image,
        title: tools[0].title,
        subtitle: tools[0].subtitle,
        color: tools[0].iconColor,
        data: [
          {
            quantity: result.analytics?.web.accepted || 0,
            text: 'accepted',
          },
          {
            quantity: result.analytics?.web.pending || 0,
            text: 'pending',
          },
          {
            quantity: result.analytics?.web.totalMoney || 0,
            text: 'totalMoney',
          },
          {
            quantity: result.analytics?.web.pendingMoney || 0,
            text: 'pendingMoney',
          },
        ],
      },
      {
        name: 'Gasto',
        slideImg: tools[1].image,
        title: tools[1].title,
        subtitle: tools[1].subtitle,
        color: tools[1].iconColor,
        data: [
          {
            quantity: result.analytics?.shop.accepted || 0,
            text: 'Gastado',
          },
          {
            quantity: result.analytics?.shop.pending || 0,
            text: 'Pedidos',
          },
          {
            quantity: result.analytics?.shop.totalMoney || 0,
            text: 'Pedidos',
          },
          {
            quantity: result.analytics?.shop.pendingMoney || 0,
            text: 'Items',
          },
        ],
      },
      {
        name: 'Fuentes de Ingresos',
        slideImg: tools[2].image,
        title: tools[2].title,
        subtitle: tools[2].subtitle,
        color: tools[2].iconColor,
        data: [
          {
            quantity: result.analytics?.seo.accepted || 0,
            text: 'Directo',
          },
          {
            quantity: result.analytics?.seo.pending || 0,
            text: 'Orgánico',
          },
          {
            quantity: result.analytics?.seo.totalMoney || 0,
            text: 'Por referencia',
          },
          {
            quantity: result.analytics?.seo.pendingMoney || 0,
            text: 'Campaña',
          },
        ],
      },
      {
        name: 'Fuentes de Ingresos',
        slideImg: tools[3].image,
        title: tools[3].title,
        subtitle: tools[3].subtitle,
        color: tools[3].iconColor,
        data: [
          {
            quantity: result.analytics?.rrss.accepted || 0,
            text: 'accepted',
          },
          {
            quantity: result.analytics?.rrss.pending || 0,
            text: 'pending',
          },
          {
            quantity: result.analytics?.rrss.totalMoney || 0,
            text: 'totalMoney',
          },
          {
            quantity: result.analytics?.rrss.pendingMoney || 0,
            text: 'pendingMoney',
          },
        ],
      },
      {
        name: 'Fuentes de Ingresos',
        slideImg: tools[4].image,
        title: tools[4].title,
        subtitle: tools[4].subtitle,
        color: tools[4].iconColor,
        data: [
          {
            quantity: result.analytics?.crm.accepted || 0,
            text: 'Directo',
          },
          {
            quantity: result.analytics?.crm.pending || 0,
            text: 'Orgánico',
          },
          {
            quantity: result.analytics?.crm.totalMoney || 0,
            text: 'Por referencia',
          },
          {
            quantity: result.analytics?.crm.pendingMoney || 0,
            text: 'Campaña',
          },
        ],
      },
      {
        name: 'Fuentes de Ingresos',
        slideImg: tools[5].image,
        title: tools[5].title,
        subtitle: tools[5].subtitle,
        color: tools[5].iconColor,
        data: [
          {
            quantity: result.analytics?.office.accepted || 0,
            text: 'Directo',
          },
          {
            quantity: result.analytics?.office.pending || 0,
            text: 'Orgánico',
          },
          {
            quantity: result.analytics?.office.totalMoney || 0,
            text: 'Por referencia',
          },
          {
            quantity: result.analytics?.office.pendingMoney || 0,
            text: 'Campaña',
          },
        ],
      },
    ]
    
    const salesOverview = {
      stats: result.salesOverview?.stats || '0%',
      sell: {
        data: result.salesOverview?.sell.data || '0%',
        total: result.salesOverview?.sell.data || '0.00€',
      },
      pendent: {
        data: result.salesOverview?.pendent.data || '0%',
        total: result.salesOverview?.pendent.total || '0.00€',
      }
    }
    
    const statisticsVertical = {
      title: 'Leads aceptados hoy',
      color: 'success',
      icon: 'tabler-users',
      stats: result.statisticsVertical?.stats || '0',
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
    
    const earningsReports = {
        total: result.earningsReports?.total || '0',
        stats: result.earningsReports?.stats || '0%',
        series:  [{
            data: result.earningsReports?.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }],
        data: [{
          color: 'primary',
          icon: 'tabler-currency-euro',
          title: 'Ganancias',
          amount: result.earningsReports?.gain.amount || '0',
          progress: result.earningsReports?.gain.progres || '0',
        },{
          color: 'info',
          icon: 'tabler-chart-pie-2',
          title: 'Pendientes',
          amount: result.earningsReports?.pendent.amount || '0',
          progress: result.earningsReports?.pendent.progres || '0',
        },{
          color: 'error',
          icon: 'tabler-ban',
          title: 'Cancelados',
          amount: result.earningsReports?.cancelled.progres || '0',
          progress: result.earningsReports?.cancelled.progres || '0',
        }]
  }
  
    const supportTracker = {
        data: result.supportTracker?.data || 0,
        total: result.supportTracker?.total || 0,
        support: result.supportTracker?.support || ['0', '0', '0 Days']
      }
      
    const monthlyCampaign = [{
        count: result.monthlyCampaign?.emails.count || '0',
        stats: result.monthlyCampaign?.emails.stats || '0%'
      },{
        count: result.monthlyCampaign?.opened.count || '0',
        stats: result.monthlyCampaign?.opened.stats || '0%'
      },{
        count: result.monthlyCampaign?.clicked.count || '0',
        stats: result.monthlyCampaign?.clicked.stats || '0%'
      },{
        count: result.monthlyCampaign?.suscribed.count || '0',
        stats: result.monthlyCampaign?.suscribed.stats || '0%'
      },{
        count: result.monthlyCampaign?.reclaimed.count || '0',
        stats: result.monthlyCampaign?.reclaimed.stats || '0%'
      },{
        count: result.monthlyCampaign?.nonsuscribed.count || '0',
        stats: result.monthlyCampaign?.nonsuscribed.stats || '0%'
      }]
      
    const accountWhitdrawal = result.accountWhitdrawal || []
      
      
      


      return {
        analytics,
        statisticsVertical,
        salesOverview,
        earningsReports,
        supportTracker,
        monthlyCampaign,
        accountWhitdrawal
      }
}


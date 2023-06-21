import logo_web from '@/assets/images/services/blue.png'
import logo_ecommerce from '@/assets/images/services/green.png'
import logo_seo from '@/assets/images/services/yellow.png'
import logo_rrss from '@/assets/images/services/red.png'
import logo_office from '@/assets/images/services/violet.png'
import logo_crm from '@/assets/images/services/orange.png'

import aeIcon from '@/assets/images/icons/payments/ae-icon.png'
import mastercardIcon from '@/assets/images/icons/payments/mastercard-icon.png'
import visaIcon from '@/assets/images/icons/payments/visa-icon.png'

import avatar1 from '@/assets/images/icons/brands/bootstrap-logo.png'

import axios from "@axios";

interface Transition {
  cardImg: string
  lastDigit: string
  cardType: string
  sentDate: string
  status: keyof Status
  trend: string
}

export const useDashboardLeads = () => {
  //fetch Services
  const getToolsWithCounts = async () => {
    const data = await axios.get('/dashboard/get-tools-with-counts');
    
    return data;
  }
  /*
    numero de leads obtenidos
    ventas realizadas
    beneficios totales ultimo mes
    ingresos diarios
    servicios vendidos
    ventas conseguidas
  */
  
  //forms
  /*
  ventas directas
  calcular valores de beneficios
  */
  
  //leads ultimos
  /*
  avatar
  nombre
  telefono
  watshapp progreess
  */
  
  //fetch transaciones
  /*
    tipo de tarjeta
    4 numeros
    fecha
    status
    budget
  */
  
  const leadsGenerator_series = [
    {
      name: 'PRODUCT A',
      data: [2, 3, 6, 4, 3, 3, 1],
    },
    {
      name: 'PRODUCT B',
      data: [-3, -4, -3, -2, -3, -3, -3],
    },
  ]
  
  const leadsSales_series = {
    series: [{
       name: 'Ventas',
       data: [100, 55, 400, 250],
    }],
    total: 175,
    
  }
  
  const leadsRevenueDiary_series = {
    total: '$4,673',
    rate: '+15.2%',
    series: [{
      name: 'Hello',
      data: [28, 10, 45, 38, 15, 30, 35, 30, 8],
    }]
  }
  
  const simpleStatisticsDemoCards = [
    {
      icon: 'tabler-currency-dollar',
      color: 'success',
      title: 'Beneficio total',
      subTitle: 'Último mes',
      stat: '200.00€'
    }
  ]
  
  const leadsServices_series = [{
    title: 'Web',
    icon: 'tabler-shopping-cart',
    data: [31, 25, 15, 40, 42, 25, 48, 8, 30]
  },{
    title: 'eCommerce',
    icon: 'tabler-chart-bar',
    data: [35, 25, 15, 40, 42, 25, 48, 8, 30]
  },{
    title: 'SEO',
    icon: 'tabler-chart-pie-2',
    data: [35, 25, 15, 40, 42, 25, 48, 8, 30]
  },{
    title: 'RRSS',
    icon: 'tabler-chart-pie-2',
    data: [35, 25, 15, 40, 42, 25, 48, 8, 30]
  },{
    title: 'Office',
    icon: 'tabler-shopping-cart',
    data: [35, 25, 15, 40, 42, 25, 48, 8, 30]
  },{
    title: 'CRM',
    icon: 'tabler-shopping-cart',
    data: [35, 25, 15, 40, 42, 25, 48, 8, 30]
  }]
  
  const leadsAnalyticsSales_series = {
      category: ['WEB', 'ERP', 'SEO', 'RRSS', 'OFFICE', 'CRM'],
      series: [{
         name: 'Total',
         data: [32, 27, 27, 30, 25, 25],
       },{
         name: 'Tools',
         data: [25, 35, 20, 20, 20, 20],
       }]
  }
  
  const leadsServicesStates_series = [
    {
      avatarImg: logo_web,
      title: 'Aythen Web',
      stats: '90.4',
      progress: 'secondary',
    },
    {
      avatarImg: logo_ecommerce,
      title: 'Aythen Ecommerce',
      stats: '70.6',
      progress: 'success',
    },
    {
      avatarImg: logo_seo,
      title: 'Ayhen SEO',
      stats: '90.4',
      progress: 'secondary',
    },
    {
      avatarImg: logo_rrss,
      title: 'Aythen RRSS',
      stats: '70.6',
      progress: 'success',
    },
    {
      avatarImg: logo_office,
      title: 'Aythen Office',
      stats: '90.4',
      progress: 'secondary',
    },
    {
      avatarImg: logo_crm,
      title: 'Aythen CRM',
      stats: '70.6',
      progress: 'success',
    }
  ]
  
  const leadsActive_series = [
    {
      avatarImg: avatar1,
      title: 'Laravel',
      subtitle: 'Ecommerce',
      stats: '65',
      progressColor: 'error',
    },
    {
      avatarImg: avatar1,
      title: 'Figma',
      subtitle: 'App UI Kit',
      stats: '86',
      progressColor: 'primary',
    },
  ]

  const leadsWhitdrawal_series: Transition[] = [
    {
      cardImg: visaIcon,
      lastDigit: '*4230',
      cardType: 'Credit',
      sentDate: '17 Mar 2022',
      status: 'Verified',
      trend: '+$1,678',
    },
    {
      cardImg: mastercardIcon,
      lastDigit: '*5578',
      cardType: 'Credit',
      sentDate: '12 Feb 2022',
      status: 'Rejected',
      trend: '-$839',
    },
    {
      cardImg: aeIcon,
      lastDigit: '*4567',
      cardType: 'Credit',
      sentDate: '28 Feb 2022',
      status: 'Verified',
      trend: '+$435',
    },
  ]

  return {
    leadsGenerator_series,
    leadsSales_series,
    leadsRevenueDiary_series,
    simpleStatisticsDemoCards,
    leadsServices_series,
    leadsAnalyticsSales_series,
    leadsServicesStates_series,
    leadsActive_series,
    leadsWhitdrawal_series,
    getToolsWithCounts
  }
}






































